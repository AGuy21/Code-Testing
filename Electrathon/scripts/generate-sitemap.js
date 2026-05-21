import fs from 'fs';
import path from 'path';

// Base URL for your hosted site
const BASE_URL = 'https://neaseelectrathon.web.app';

// Define the routes you want in the sitemap. Add or remove routes as needed.
const routes = ['/', '/about', '/connect', '/events', '/sponsorship'];

const now = new Date().toISOString();

const urlEntries = routes
  .map((r) => {
    const loc = `${BASE_URL}${r}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

// Ensure output directory exists (dist)
const outDir = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(outDir)) {
  console.error('dist directory not found. Run the build first.');
  process.exit(1);
}

const outPath = path.join(outDir, 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Sitemap written to', outPath);

// Also write to public/sitemap.xml so deploying public directly works
const publicDir = path.resolve(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  const publicPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');
  console.log('Sitemap also written to', publicPath);
}
