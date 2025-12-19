import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// ユニットテスト用のVitest設定
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // Storybookのストーリーファイルは除外
    exclude: ['**/*.stories.{ts,tsx}', '**/node_modules/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/app': path.resolve(__dirname, './src/app'),
    },
  },
})
