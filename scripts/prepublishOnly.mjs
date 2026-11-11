/*
|--------------------------------------------------------------------------
|
| npm publish 前检查：
| 1 根目录 package.json 的版本号是否和 hel_dist/hel-meta.json 一致
| 2 hel_dist 是否为发布用构建（资源地址不能是 localhost / 127.0.0.1）
|
|--------------------------------------------------------------------------
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const pkg = require('../package.json')
const helDistPath = path.resolve(__dirname, '../hel_dist/hel-meta.json')

// 检查是否执行过 build 打包命令
if (!fs.existsSync(helDistPath)) {
  console.log("\x1b[31mRun the 'pnpm run build' command first.\n\x1b[0m")
  process.exit(1)
}

const { app, version } = JSON.parse(fs.readFileSync(helDistPath, 'utf-8'))
// 检查根目录 package.json 的版本号是否和 hel_dist/hel-meta.json 一致
if (app?.build_version !== pkg.version) {
  console.log(
    '\x1b[31mThe package.json version number and the hel_dist/hel-meta.json version number must be the same.\n\x1b[0m'
  )
  process.exit(1)
}

// 检查产物里的资源地址是否仍是本地联调地址（build:local 的产物不可发布）
const webDirPath = version?.src_map?.webDirPath || ''
if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(webDirPath)) {
  console.log(
    `\x1b[31mhel_dist 里的资源地址是本地联调地址（${webDirPath}），请先执行 pnpm run build 生成指向 unpkg 的发布产物。\n\x1b[0m`
  )
  process.exit(1)
}
