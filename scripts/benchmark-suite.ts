import fs from 'fs';
import path from 'path';

interface LatencyResult {
  url: string;
  category: 'public-page' | 'admin-page' | 'api-endpoint';
  status: number;
  ttfbMs: number;
  totalTimeMs: number;
  sizeBytes: number;
  contentType: string;
}

const TARGETS = [
  // Public Website
  { url: 'http://localhost:3000/', category: 'public-page' as const },
  { url: 'http://localhost:3000/about', category: 'public-page' as const },
  { url: 'http://localhost:3000/services', category: 'public-page' as const },
  { url: 'http://localhost:3000/projects', category: 'public-page' as const },
  { url: 'http://localhost:3000/projects?country=saudi-arabia', category: 'public-page' as const },
  { url: 'http://localhost:3000/projects?country=egypt', category: 'public-page' as const },
  { url: 'http://localhost:3000/projects?country=qatar', category: 'public-page' as const },
  { url: 'http://localhost:3000/projects/way-care-medical-hospital', category: 'public-page' as const },
  { url: 'http://localhost:3000/projects/beverly-al-azeeza-new-facade', category: 'public-page' as const },
  { url: 'http://localhost:3000/contact', category: 'public-page' as const },

  // Admin Dashboard
  { url: 'http://localhost:3001/login', category: 'admin-page' as const },
  { url: 'http://localhost:3001/', category: 'admin-page' as const },
  { url: 'http://localhost:3001/projects', category: 'admin-page' as const },
  { url: 'http://localhost:3001/services', category: 'admin-page' as const },
  { url: 'http://localhost:3001/home', category: 'admin-page' as const },
  { url: 'http://localhost:3001/about', category: 'admin-page' as const },
  { url: 'http://localhost:3001/contact', category: 'admin-page' as const },
  { url: 'http://localhost:3001/media', category: 'admin-page' as const },
  { url: 'http://localhost:3001/settings', category: 'admin-page' as const },

  // Backend API Endpoints
  { url: 'http://localhost:4000/health', category: 'api-endpoint' as const },
  { url: 'http://localhost:4000/api/v1/projects', category: 'api-endpoint' as const },
  { url: 'http://localhost:4000/api/v1/projects?country=saudi-arabia', category: 'api-endpoint' as const },
  { url: 'http://localhost:4000/api/v1/projects/way-care-medical-hospital', category: 'api-endpoint' as const },
  { url: 'http://localhost:4000/api/v1/services', category: 'api-endpoint' as const },
  { url: 'http://localhost:4000/api/v1/home', category: 'api-endpoint' as const },
  { url: 'http://localhost:4000/api/v1/about', category: 'api-endpoint' as const },
  { url: 'http://localhost:4000/api/v1/contact', category: 'api-endpoint' as const },
];

async function measureUrl(target: typeof TARGETS[0]): Promise<LatencyResult[]> {
  const samples: LatencyResult[] = [];
  const RUNS = 3;

  for (let i = 0; i < RUNS; i++) {
    const start = performance.now();
    let ttfb = 0;
    try {
      const res = await fetch(target.url, {
        headers: { 'Accept-Encoding': 'gzip, deflate, br' },
      });
      ttfb = performance.now() - start;
      const arrayBuffer = await res.arrayBuffer();
      const totalTime = performance.now() - start;

      samples.push({
        url: target.url,
        category: target.category,
        status: res.status,
        ttfbMs: Math.round(ttfb * 100) / 100,
        totalTimeMs: Math.round(totalTime * 100) / 100,
        sizeBytes: arrayBuffer.byteLength,
        contentType: res.headers.get('content-type') || '',
      });
    } catch (e: any) {
      samples.push({
        url: target.url,
        category: target.category,
        status: 0,
        ttfbMs: 0,
        totalTimeMs: 0,
        sizeBytes: 0,
        contentType: `Error: ${e.message}`,
      });
    }
  }

  return samples;
}

async function runBenchmark() {
  console.log('⚡ Starting comprehensive baseline performance audit...');
  const allResults: Record<string, any> = {};

  for (const target of TARGETS) {
    process.stdout.write(`Testing [${target.category}] ${target.url} ... `);
    const samples = await measureUrl(target);
    const valid = samples.filter((s) => s.status > 0);
    const avgTtfb = valid.length ? valid.reduce((a, b) => a + b.ttfbMs, 0) / valid.length : 0;
    const avgTotal = valid.length ? valid.reduce((a, b) => a + b.totalTimeMs, 0) / valid.length : 0;
    const p95Total = valid.length ? [...valid].sort((a, b) => a.totalTimeMs - b.totalTimeMs)[Math.floor(valid.length * 0.95)]?.totalTimeMs ?? avgTotal : 0;
    const sizeBytes = valid[0]?.sizeBytes || 0;
    const status = valid[0]?.status || 0;

    console.log(`Status: ${status} | TTFB: ${avgTtfb.toFixed(1)}ms | Latency: ${avgTotal.toFixed(1)}ms | Size: ${(sizeBytes / 1024).toFixed(1)}KB`);

    allResults[target.url] = {
      category: target.category,
      status,
      avgTtfbMs: Math.round(avgTtfb * 10) / 10,
      avgTotalTimeMs: Math.round(avgTotal * 10) / 10,
      p95TotalTimeMs: Math.round(p95Total * 10) / 10,
      sizeBytes,
      sizeKB: Math.round((sizeBytes / 1024) * 10) / 10,
      samples,
    };
  }

  const outDir = path.resolve(process.cwd(), 'docs/performance/baseline');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'benchmark-baseline.json');
  fs.writeFileSync(outPath, JSON.stringify(allResults, null, 2), 'utf-8');
  console.log(`\n✅ Saved comprehensive baseline benchmark report to: ${outPath}`);
}

runBenchmark();
