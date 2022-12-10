import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// Only port 3000 is properly configured with CORS when running locally
const PORT = 3000;

// eslint-disable-next-line import/no-default-export
export default defineConfig((env) => {
  process.env = { ...process.env, ...loadEnv(env.mode, process.cwd()) };
  return {
    base: '/alphablock-swap/',
    server: {
      port: PORT,
      open: `http://localhost:${PORT}`,
    },
    preview: {
      port: PORT,
      open: `http://localhost:${PORT}`,
    },
    build: {
      outDir: './build',
      sourcemap: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: [path.resolve(__dirname, './src')],
        },
      },
    },
    esbuild: {
      // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
    plugins: [
      env.mode === 'development' &&
        checker({
          overlay: {
            initialIsOpen: process.env.VITE_DEV_SERVER_OVERLAY === 'true',
          },
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}" -c .eslintrc.js',
          },
          typescript: true,
        }),
      svgr(),
      vanillaExtractPlugin(),
      tsconfigPaths(),
      react({
        babel: {
          babelrc: true,
        },
      }),
      createHtmlPlugin(),
      Boolean(process.env.VISUALIZE_BUNDLE) && visualizer(),
    ],
  };
});
