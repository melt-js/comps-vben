/*
|--------------------------------------------------------------------------
|
| 构建产物守卫：禁止产物里出现「先引用、后声明」的 let / const / class（TDZ）。
| 这类代码浏览器加载即抛 `Cannot access xxx before initialization`，
| 且混淆后变量名是 `_0x...`，很难看出真因。
|
| 真正的实现在仓库根 scripts/check-tdz.mjs（多个 comps 包共用一份）；
| 本文件只负责定位它；独立安装本包（脱离 monorepo）时找不到就跳过，不影响构建。
|
|--------------------------------------------------------------------------
*/
import fs from 'node:fs'

const shared = new URL('../../scripts/check-tdz.mjs', import.meta.url)
if (!fs.existsSync(shared)) {
  console.warn('[check-tdz] 未找到仓库根 scripts/check-tdz.mjs，跳过产物检查')
  process.exit(0)
}
await import(shared.href)
