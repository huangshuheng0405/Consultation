# ExcellentConsultation（Vue3 + TS + Pinia + Vant4）

This template should help get you started developing with Vue 3 in Vite.

# Document

[接口文档](https://s.apifox.cn/aeb0d03e-c713-4f55-afaf-21cddf542751)

[开发文档](https://zhousg.github.io/patient-h5-note/)

# 项目技术栈

## 核心框架

| 技术       | 版本   | 说明     |
| ---------- | ------ | -------- |
| Vue        | 3.5.25 | 前端框架 |
| TypeScript | 5.9.0  | 类型安全 |
| Vite       | 7.2.4  | 构建工具 |

## 状态管理 & 路由

| 技术                        | 版本  | 说明       |
| --------------------------- | ----- | ---------- |
| Pinia                       | 3.0.4 | 状态管理   |
| pinia-plugin-persistedstate | 4.7.1 | 状态持久化 |
| Vue Router                  | 4.6.3 | 路由管理   |

## UI 组件库

| 技术 | 版本   | 说明             |
| ---- | ------ | ---------------- |
| Vant | 4.9.22 | 移动端 UI 组件库 |

## 网络请求 & 通信

| 技术             | 版本   | 说明               |
| ---------------- | ------ | ------------------ |
| axios            | 1.13.2 | HTTP 请求          |
| socket.io-client | 4.8.2  | WebSocket 实时通信 |

## 工具库

| 技术         | 版本    | 说明                 |
| ------------ | ------- | -------------------- |
| @vueuse/core | 14.1.0  | Vue 组合式函数工具集 |
| dayjs        | 1.11.19 | 日期处理             |
| nprogress    | 0.2.0   | 页面加载进度条       |

## 地图服务

| 技术                    | 版本  | 说明            |
| ----------------------- | ----- | --------------- |
| @amap/amap-jsapi-loader | 1.0.1 | 高德地图 JS API |

## 开发工具 & 插件

| 技术                     | 版本   | 说明               |
| ------------------------ | ------ | ------------------ |
| @vitejs/plugin-vue       | 6.0.2  | Vue 单文件组件支持 |
| @vitejs/plugin-vue-jsx   | 5.1.2  | JSX 支持           |
| vite-plugin-vue-devtools | 8.0.5  | Vue 开发者工具     |
| unplugin-vue-components  | 30.0.0 | 组件自动导入       |
| vite-plugin-svg-icons    | 2.0.1  | SVG 图标处理       |
| vite-plugin-html         | 3.2.2  | HTML 模板处理      |
| vite-plugin-mock         | 3.0.2  | Mock 数据服务      |
| mockjs                   | 1.1.0  | Mock 数据生成      |

## CSS 处理

| 技术                   | 版本   | 说明                   |
| ---------------------- | ------ | ---------------------- |
| sass                   | 1.96.0 | CSS 预处理器           |
| postcss-px-to-viewport | 1.1.1  | 移动端适配（px 转 vw） |

## 代码规范

| 技术        | 版本   | 说明         |
| ----------- | ------ | ------------ |
| ESLint      | 9.39.1 | 代码检查     |
| Prettier    | 3.6.2  | 代码格式化   |
| husky       | 8.0.0  | Git Hooks    |
| lint-staged | 16.2.7 | 暂存文件检查 |

## 环境要求

- **Node.js**: `^20.19.0` 或 `>=22.12.0`
- **包管理器**: pnpm

## 常用命令

```bash
pnpm dev      # 启动开发服务器
pnpm build    # 生产环境打包
pnpm lint     # ESLint 修复
pnpm format   # Prettier 格式化
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
