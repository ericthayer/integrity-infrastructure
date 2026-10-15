import { createReadStream, cpSync, existsSync, statSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
// Build helpers run in Node, not in the browser application.
import { prepareData, TOKEN_FILE } from './tools/lib/build-data.mjs';

const root = import.meta.dirname;
// The website (Home at the root plus six inner pages), then the concept hub, concepts and boards.
const sitePages = ['index.html', 'about/index.html', 'services/index.html', 'safety/index.html',
  'careers/index.html', 'subcontractors/index.html', 'contact/index.html'];
const pages = [...sitePages, 'concepts/index.html', 'concepts/work-light/index.html', 'concepts/as-built/index.html',
  'concepts/crew/index.html', 'concepts/lit-fiber/index.html', 'brandkit/index.html'];

function projectData(): Plugin {
  return {
    name: 'integrity-project-data',
    buildStart() { prepareData(); },
    configureServer(server) {
      prepareData();
      server.watcher.add(TOKEN_FILE);
    },
    handleHotUpdate({ file, server, timestamp }) {
      if (file !== TOKEN_FILE) return;
      prepareData();
      for (const generated of ['tokens.css', 'icons.ts']) {
        for (const module of server.moduleGraph.getModulesByFile(join(root, 'src/generated', generated)) || []) {
          server.moduleGraph.invalidateModule(module, undefined, timestamp, true);
        }
      }
      server.ws.send({ type: 'full-reload' });
      return [];
    },
  };
}

function originalReference(): Plugin {
  return {
    name: 'original-site-reference',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url || '/', 'http://localhost').pathname;
        if (!pathname.startsWith('/reference/')) return next();
        let decoded: string;
        try { decoded = decodeURIComponent(pathname); } catch { response.statusCode = 400; response.end(); return; }
        const assetPrefix = '/reference/integrity-infrastructure_files/';
        const directory = decoded.startsWith(assetPrefix) ? join(root, 'integrity-infrastructure_files') : join(root, 'reference');
        const suffix = decoded.startsWith(assetPrefix) ? decoded.slice(assetPrefix.length) : decoded.slice('/reference/'.length) || 'index.html';
        const file = resolve(directory, suffix);
        if (!file.startsWith(directory + sep) || !existsSync(file) || !statSync(file).isFile()) {
          response.statusCode = 404; response.end('Not found'); return;
        }
        const mime: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
        response.setHeader('Content-Type', suffix === 'css' ? 'text/css' : mime[extname(file)] || 'application/octet-stream');
        const stream = createReadStream(file);
        stream.on('error', () => { response.destroy(); });
        stream.pipe(response);
      });
    },
  };
}

function originalReferenceArchive(): Plugin {
  let outDir: string;
  return {
    name: 'original-site-reference-archive',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      cpSync(join(root, 'reference'), join(outDir, 'reference'), { recursive: true });
      cpSync(join(root, 'integrity-infrastructure_files'), join(outDir, 'reference/integrity-infrastructure_files'), { recursive: true });
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [projectData(), originalReference(), originalReferenceArchive()],
  server: { host: '127.0.0.1', port: 5173, strictPort: true, open: '/concepts/' },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    outDir: 'dist',
    rolldownOptions: { input: pages.map(page => resolve(root, page)) },
  },
});