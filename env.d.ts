/// <reference types="vite/client" />

// vite-plugin-svg-icons 虚拟模块类型声明
declare module 'virtual:svg-icons-register'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    never
  >
  export default component
}
