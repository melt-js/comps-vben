/*
|--------------------------------------------------------------------------
|
| 生成 hel-meta.json（写入 hel_dist）
|
|--------------------------------------------------------------------------
*/
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import helDevUtils from 'hel-dev-utils'
import appInfo from '../appInfo.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const pkg = require('../package.json')

try {
  await helDevUtils.extractHelMetaJson({
    appInfo,
    buildDirFullPath: path.join(__dirname, '../hel_dist'),
    packageJson: pkg
  })
  console.log('[comps-vben] hel-meta.json 生成完成')
} catch (err) {
  console.error('[comps-vben] hel-meta.json 生成失败:', err)
  process.exit(-1)
}
