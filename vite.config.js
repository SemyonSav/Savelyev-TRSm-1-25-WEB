import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5 использует устаревший синтаксис Sass — скрываем его предупреждения
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },
  build: {
    target: 'es2022',
    // Изображения меньше 4 КБ встраиваются в бандл как data URI
    assetsInlineLimit: 4096,
    rolldownOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ names }) => {
          const name = names[0] ?? '';
          if (name.endsWith('.css')) return 'assets/css/[name]-[hash][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Библиотеки выносятся в отдельные чанки: они меняются реже кода
        // приложения и дольше остаются в кеше браузера
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: 'router',
              test: /node_modules[\\/](react-router|cookie|set-cookie-parser)[\\/]/,
              priority: 20,
            },
            {
              name: 'ui',
              test: /node_modules[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
