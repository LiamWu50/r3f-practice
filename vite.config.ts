import path from 'path'
import { defineConfig, loadEnv } from 'vite'

import presets from './build/presets'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_PUBLIC_PATH,
    plugins: [presets()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    assetsInclude: ['**/*.glb', '**/*.gltf'],
    server: {
      host: '127.0.0.1', // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      port: Number(env.VITE_PORT), // 端口
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true // 如果端口已占用直接退出
    },
    build: {
      sourcemap: false,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 在生产环境移除console.log
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          api: 'modern-compiler', // or 'modern'
          // eslint-disable-next-line quotes
          additionalData: "@use '@/styles/variables.scss' as *;"
        }
      }
    }
  }
})
