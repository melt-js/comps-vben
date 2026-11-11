# @melt-js/comps-vben

由 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 5.8 的组件层合并而来的包：`packages/@core/ui-kit/*` 六个 UI 套件，加上 `common-ui`、`layouts`、`plugins` 三个组件/布局/插件包。

基础能力（`shared` / `composables` / `preferences` / `icons` / `stores` / `request` 等）来自 [`libs-vben`](../libs-vben)。本包依赖 `libs-vben`，不反向依赖，避免循环。

## 合并范围

| 子路径 | 上游包 | 内容 |
| --- | --- | --- |
| `shadcn-ui` | `@vben-core/shadcn-ui` | shadcn 风格基础组件（Button / Dialog / Table / Tree …） |
| `form-ui` | `@vben-core/form-ui` | VbenForm 表单引擎 |
| `layout-ui` | `@vben-core/layout-ui` | 布局骨架 |
| `menu-ui` | `@vben-core/menu-ui` | 菜单 |
| `popup-ui` | `@vben-core/popup-ui` | Modal / Drawer / Alert |
| `tabs-ui` | `@vben-core/tabs-ui` | 标签页 |
| `common-ui` | `@vben/common-ui` | 通用业务组件（登录、验证码、JSON 查看器、IconPicker …） |
| `common-ui/es/tippy` | `@vben/common-ui/es/tippy` | tippy 初始化 |
| `layouts` | `@vben/layouts` | BasicLayout / 用户下拉 / 通知 / 锁屏 |
| `plugins` | `@vben/plugins` | ECharts / Tiptap / VXE Table / Motion 封装 |
| `plugins/echarts` | `@vben/plugins/echarts` | ECharts 组件与 hook |
| `plugins/tiptap` | `@vben/plugins/tiptap` | Tiptap 富文本 |
| `plugins/vxe-table` | `@vben/plugins/vxe-table` | VXE Table 封装 |
| `plugins/motion` | `@vben/plugins/motion` | @vueuse/motion 插件 |

## 使用

```ts
import { registerLoadingDirective } from '@melt-js/comps-vben/common-ui';
import { BasicLayout } from '@melt-js/comps-vben/layouts';
import { useVbenForm } from '@melt-js/comps-vben/form-ui';
```

模板 [`tpl-vue3-admin-ele-vben`](../tpl-vue3-admin-ele-vben) 通过 `Element Plus` 适配器把 Element Plus 组件注册进 `form-ui` 的组件表。

## 边界

- 只放 UI 组件、布局、可视化/编辑器插件；协议层、请求、store、权限、i18n 在 `libs-vben`。
- `common-ui`、`layouts`、`plugins` 虽然在上游属于 `packages/effects/*`，但都是组件或组件封装，因此归入本包；这样 `comps-vben -> libs-vben` 保持单向依赖。
- 源码按子目录保存，`exports` 与上游包名 / 子路径一一对应。

## 目录

```text
src/
  common-ui/   # @vben/common-ui
  form-ui/     # @vben-core/form-ui
  layout-ui/   # @vben-core/layout-ui
  layouts/     # @vben/layouts
  menu-ui/     # @vben-core/menu-ui
  plugins/     # @vben/plugins
  popup-ui/    # @vben-core/popup-ui
  shadcn-ui/   # @vben-core/shadcn-ui
  tabs-ui/     # @vben-core/tabs-ui
```


## 发布

本包是源码包（与 `libs-fan` / `comps-fan` 一样），`files` 发布 `src`。

```bash
pnpm publish:stage
```

脚本会先用 `pnpm pack` 把 `workspace:*` 重写成当前版本，再提交 npm stage；
批准后可由 unpkg 提供源码文件（需要消费方自行用 Vite / bundler 编译）。


## hel 远程组件

`comps-vben` 以 hel-micro 远程组件形式发布，产物：

- `hel_dist/`：UMD 组件包 + Tailwind 样式 + `hel-meta.json`
- `hel_proxy/` / `hel_proxy_es/`：npm 包的空壳代理，真正实现由 `preFetchLib('comps-vben')` 注入

本地联调：

```bash
pnpm vben-comps:dev   # http://localhost:20090
```

宿主需要先注入共享运行时，再预加载：

- 共享：`vue` / `element-plus` / `vue-router` / `pinia` / `vue-i18n`
- 有状态 libs 模块：`LibsVbenPreferences` / `LibsVbenStores` / `LibsVbenLocales` / `LibsVbenGlobalState`

对外能力按子路径拆成命名空间（`window.__COMPS_VBEN__` 与 `preFetchLib` 返回值同构）：

| 命名空间 | 对应源码 |
| --- | --- |
| `commonUi` | `common-ui` |
| `commonUiTippy` | `common-ui/es/tippy` |
| `layouts` | `layouts` |
| `menuUi` | `menu-ui` |
| `plugins` | `plugins` |
| `pluginsEcharts` | `plugins/echarts` |
| `pluginsMotion` | `plugins/motion` |
| `pluginsTiptap` | `plugins/tiptap` |
| `pluginsVxeTable` | `plugins/vxe-table` |

宿主不要直接 import comps-vben 源码，而是在 `preFetchLib` 之后按命名空间取值；
`tpl-vue3-admin-ele-vben` / `tpl-vue3-admin-antd-vben` 的 `src/remote/comps.ts` 就是这种代理层。

线上地址：

```text
https://unpkg.com/@melt-js/comps-vben@<version>/hel_dist/hel-meta.json
```
