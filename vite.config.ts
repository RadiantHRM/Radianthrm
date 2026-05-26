import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      // Set to '/' for most deployment platforms (Vercel, Netlify, DigitalOcean, etc.)
      base: '/',
      
      server: {
        port: 3000,
        host: '0.0.0.0',
        strictPort: true, // Fail if port is in use, common in CI/CD
      },

      plugins: [react(), tailwindcss()],

      define: {
        // Baking in environment variables at build time for the client-side app
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.NODE_ENV': JSON.stringify(mode),
      },

      resolve: {
        alias: {
          // Standard '@' alias pointing to the src directory
          '@': path.resolve(__dirname, './src'),
        },
      },

      build: {
        // Build output configuration
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: mode !== 'production', // Help debug in staging, keep prod clean
        minify: 'esbuild', // Fast and efficient minification
        cssMinify: true,
        
        // Chunking strategy to improve loading performance on CDNs
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor': ['react', 'react-dom'],
              'ui-icons': ['lucide-react', 'motion'],
              'charts': ['recharts'],
            },
          },
        },
        
        // Increase limit for modern heavy-set applications
        chunkSizeWarningLimit: 1000,
      },

      // Improve dependency pre-bundling for faster development starts
      optimizeDeps: {
        include: ['react', 'react-dom', 'lucide-react', 'motion'],
      },
    };
});
