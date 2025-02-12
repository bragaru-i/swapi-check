/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    base: env.VITE_BASE_URL,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        reportsDirectory: path.resolve(__dirname, 'dist/test-coverage'),
        provider: 'v8',
        exclude: ['src/api', 'src/components'],
      },
    },
  }
})
