import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './src/common'),
      '@store': path.resolve(__dirname, './src/common/store'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
