/// <reference types="vitest/config" />

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// 配置组件自动注册的插件
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 80,
    host: true
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  plugins: [
    viteMockServe({
      // 在哪个文件夹下编写模拟接口的代码
      mockPath: './src/mock',
      // 在开发环境开启mock
      enable: true
    }),
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          DEV: mode === 'development',
          VITE_APP_TITLE: mode === 'development' ? '优医问诊-dev' : '优医问诊',
          VITE_APP_CALLBACK:
            mode === 'development'
              ? 'http://localhost:80'
              : 'https://cp.itheima.net'
        }
      }
    }),
    vueJsx(),
    vueDevTools(),
    Components({
      // 不生成components.d.ts文件
      dts: false,
      // 自动导入 Vant 组件的样式 importStyle 避免重复引入样式
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
