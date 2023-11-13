import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

const key = fs.readFileSync(path.join(__dirname, './secrets/localhost-key.pem'), 'utf-8');
const cert = fs.readFileSync(path.join(__dirname, './secrets/localhost.pem'), 'utf-8');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key,
      cert,
    },
  },
})
