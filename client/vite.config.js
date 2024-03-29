import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Konvertiere __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute Pfade zu deinem SSL-Zertifikat und Schlüssel
const keyPath = path.join(__dirname, '../certs/server.key');
const certPath = path.join(__dirname, '../certs/server.cert');

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }
  }
});
