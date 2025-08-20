import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
      '@context': resolve(__dirname, './src/context'),
      '@styles': resolve(__dirname, './src/styles'),
      '@types': resolve(__dirname, './src/types'),
      '@assets': resolve(__dirname, './src/assets'),
      '@hooks': resolve(__dirname, './src/hooks'),
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    },
    include: [
      'react',
      'react-dom',
      'framer-motion',
      '@tonconnect/ui-react',
    ],
    exclude: [
      'buffer',
      'ton-core',
      'ton-crypto',
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Вендоры React
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // TON библиотеки
          'ton-vendor': ['@tonconnect/ui-react', '@orbs-network/ton-access'],
          // Анимации
          'animation-vendor': ['framer-motion'],
          // UI библиотеки
          'ui-vendor': ['@headlessui/react', 'react-hook-form', '@hookform/resolvers', 'zod'],
          // Утилиты
          'utils-vendor': ['clsx', 'tailwind-merge', 'react-toastify'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 4000,
    strictPort: true,
    host: true,
  },
})
