# Typography Architecture & Legal Licensing Strategy

## Extracted Fonts from the 68-Page Corporate PDF

Programmatic text extraction revealed the following fonts used in the source profile:

| Font Name | Usage in PDF | Licensing Status |
|---|---|---|
| `AudiType-ExtendedBold` | 90pt Display Titles (Page section headers) | ❌ **Proprietary (Audi AG / Volkswagen Group)** |
| `AudiType-WideNormal` | 36pt–43pt Intro & Vision text | ❌ **Proprietary (Audi AG / Volkswagen Group)** |
| `AudiType-Bold` | 33pt Organizational department titles | ❌ **Proprietary (Audi AG / Volkswagen Group)** |
| `STV` / `STV-Bold` | 42pt–77pt Arabic project titles & details | ⚠️ Custom / Commercial proprietary |
| `Montserrat-Regular` | Technical terms (e.g. "G R C") | ✅ Open Source (OFL / Google Fonts) |

---

## Legal & Compliance Statement

`AudiType` is a proprietary corporate typeface created exclusively for **Audi AG**. Redistributing or embedding this font on a commercial web application without explicit legal licensing from Audi AG constitutes copyright and trademark infringement.

---

## Safe & High-Fidelity Web Alternatives

We established a CSS Variable abstraction system in `globals.css` and `@dar-elmashrq/config/tailwind`:

```css
:root {
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body: 'Barlow', sans-serif;
  --font-arabic: 'IBM Plex Arabic', sans-serif;
}
```

### 1. English Display (`--font-display`)
- **Primary:** **Barlow Condensed ExtraBold (Weight 800, Uppercase)** (Google Fonts)
  - Matches the architectural, wide, structural personality of `AudiType-ExtendedBold` with zero licensing risk.
- **Alternatives:** Bebas Neue, Oswald, Rajdhani.

### 2. English Body (`--font-body`)
- **Primary:** **Barlow** (Google Fonts)
  - Provides natural visual harmony with the display headings.

### 3. Arabic Typography (`--font-arabic`)
- **Primary:** **IBM Plex Arabic** (Google Fonts)
  - Technical, crisp, engineered Arabic letterforms that suit a contracting and engineering authority.
- **Alternatives:** Cairo, Tajawal, Almarai.
