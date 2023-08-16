import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env files

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
