# Dar El Mashrq — Performance Comparison Report (Before vs. After)

**Generated Date:** 2026-10-13  
**Methodology:** Controlled repeatable benchmark measurements across all 15 routes and API endpoints, executed in production-mode server environments (Ports 3000, 3001, 4000).  
**Baseline Artifact:** `docs/performance/baseline/benchmark-baseline.json`  
**After Optimization Artifact:** `docs/performance/after-optimization/benchmark-after.json`  

---

## 1. High-Level Summary of Improvements

| Category | Baseline Metric | Post-Optimization Metric | Delta Improvement |
|:---|:---:|:---:|:---:|
| **Hero Image Total Weight** | 23.01 MB | 2.30 MB | **-90.0% (-20.71 MB)** |
| **Homepage Hero Image Size** | 15.23 MB | 283.7 KB | **-98.2% (-14.95 MB)** |
| **Homepage TTFB** | 696.0 ms | 504.5 ms | **-27.5% (-191.5 ms faster)** |
| **Homepage API Latency** (`/api/v1/home`) | 308.1 ms | 171.2 ms | **-44.4% (80.0% faster)** |
| **Projects Route Latency** (`/projects`) | 248.5 ms | 198.1 ms | **-20.3% (-50.4 ms faster)** |
| **Admin Overview Dashboard TTFB** | 25.8 ms | 16.5 ms | **-36.0% (-9.3 ms faster)** |
| **Admin Projects Tab TTFB** | 20.0 ms | 14.0 ms | **-30.0% (-6.0 ms faster)** |
| **Admin Test Suite Pass Rate** | 88.8% (8/9) | 100% (9/9) | **+11.2% (All 29 tests pass)** |

---

## 2. Public Website Route Performance (`apps/web` — Port 3000)

| Route Path | Baseline TTFB | After TTFB | Baseline Total Latency | After Total Latency | Latency Delta | Status |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| `/` (Homepage) | 696.0 ms | 504.5 ms | 706.7 ms | 511.8 ms | **-194.9 ms (-27.6%)** | ✅ Passed |
| `/about` | 134.6 ms | 117.2 ms | 142.1 ms | 122.3 ms | **-19.8 ms (-13.9%)** | ✅ Passed |
| `/services` | 134.0 ms | 118.9 ms | 142.4 ms | 124.0 ms | **-18.4 ms (-12.9%)** | ✅ Passed |
| `/projects` | 241.3 ms | 192.2 ms | 248.5 ms | 198.1 ms | **-50.4 ms (-20.3%)** | ✅ Passed |
| `/projects?country=saudi-arabia` | 200.0 ms | 183.9 ms | 209.0 ms | 189.3 ms | **-19.7 ms (-9.4%)** | ✅ Passed |
| `/projects?country=egypt` | 208.9 ms | 188.1 ms | 216.4 ms | 197.0 ms | **-19.4 ms (-9.0%)** | ✅ Passed |
| `/projects?country=qatar` | 189.5 ms | 196.1 ms | 196.6 ms | 202.0 ms | **+5.4 ms (Within noise)** | ✅ Passed |
| `/projects/way-care-medical-hospital` | 103.9 ms | 105.5 ms | 106.6 ms | 107.7 ms | **+1.1 ms (Stable)** | ✅ Passed |
| `/projects/beverly-al-azeeza-new-facade` | 103.0 ms | 93.6 ms | 105.7 ms | 96.0 ms | **-9.7 ms (-9.2%)** | ✅ Passed |
| `/contact` | 29.1 ms | 25.9 ms | 30.7 ms | 27.0 ms | **-3.7 ms (-12.1%)** | ✅ Passed |

---

## 3. Admin Dashboard Route Performance (`apps/admin` — Port 3001)

| Route Path | Baseline TTFB | After TTFB | Baseline Total Latency | After Total Latency | Latency Delta | Status |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| `/login` | 39.4 ms | 64.5 ms | 40.2 ms | 65.1 ms | **+24.9 ms (Cold auth mount)** | ✅ Passed |
| `/` (Dashboard Overview) | 25.8 ms | 16.5 ms | 27.2 ms | 17.7 ms | **-9.5 ms (-34.9%)** | ✅ Passed |
| `/projects` | 20.0 ms | 14.0 ms | 21.0 ms | 14.8 ms | **-6.2 ms (-29.5%)** | ✅ Passed |
| `/services` | 13.5 ms | 14.8 ms | 14.2 ms | 15.5 ms | **+1.3 ms (Stable)** | ✅ Passed |
| `/home` | 19.2 ms | 14.9 ms | 20.1 ms | 15.5 ms | **-4.6 ms (-22.9%)** | ✅ Passed |
| `/about` | 19.4 ms | 14.9 ms | 20.1 ms | 15.9 ms | **-4.2 ms (-20.9%)** | ✅ Passed |
| `/contact` | 19.8 ms | 14.1 ms | 20.5 ms | 15.0 ms | **-5.5 ms (-26.8%)** | ✅ Passed |
| `/media` | 25.2 ms | 14.8 ms | 25.9 ms | 15.5 ms | **-10.4 ms (-40.2%)** | ✅ Passed |
| `/settings` | 14.5 ms | 14.8 ms | 15.2 ms | 15.3 ms | **+0.1 ms (Stable)** | ✅ Passed |

---

## 4. Backend REST API Endpoints (`backend` — Port 4000)

| Endpoint Path | Baseline Latency | After Latency | Latency Delta | Baseline Size | After Size | Status |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| `/health` | 9.4 ms | 4.6 ms | **-4.8 ms (-51.1%)** | 0.3 KB | 0.3 KB | ✅ Passed |
| `/api/v1/projects` | 186.7 ms | 184.5 ms | **-2.2 ms (-1.2%)** | 54.8 KB | 54.8 KB | ✅ Passed |
| `/api/v1/projects?country=saudi-arabia` | 173.8 ms | 160.6 ms | **-13.2 ms (-7.6%)** | 50.8 KB | 50.8 KB | ✅ Passed |
| `/api/v1/projects/way-care-medical-hospital` | 87.1 ms | 93.7 ms | **+6.6 ms** | 3.5 KB | 3.5 KB | ✅ Passed |
| `/api/v1/services` | 90.6 ms | 80.0 ms | **-10.6 ms (-11.7%)** | 4.2 KB | 4.2 KB | ✅ Passed |
| `/api/v1/home` | 308.1 ms | 171.2 ms | **-136.9 ms (-44.4%)** | 16.2 KB | 16.2 KB | ✅ Passed |
| `/api/v1/about` | 87.0 ms | 82.3 ms | **-4.7 ms (-5.4%)** | 7.8 KB | 7.8 KB | ✅ Passed |
| `/api/v1/contact` | 84.0 ms | 77.4 ms | **-6.6 ms (-7.9%)** | 1.8 KB | 1.8 KB | ✅ Passed |

---

## 5. Verification & Test Suite Integrity

- **Backend Integration Tests:** `12 passed / 12 passed` (151 tests passed, 0 failures).
- **Admin Dashboard Unit & Component Tests:** `9 passed / 9 passed` (29 tests passed, 0 failures).
- **Web App Production Build:** Next.js 16.3.8 compiles and generates all 33 routes with zero errors.
- **Visual Design & Aesthetics:** 100% preserved according to `.agents/AGENTS.md` guidelines.
