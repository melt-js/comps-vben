/*
|--------------------------------------------------------------------------
|
| 此脚本在流水线上会被触达，用于校验组名是否和应用里的组名保持一致
|
|--------------------------------------------------------------------------
*/
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import helDevUtils from 'hel-dev-utils'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const pkg = require('../package.json')

const fileFullPath = path.join(__dirname, '../src/configs/subApp')
helDevUtils.check(pkg, { fileFullPath, checkEnv: false })
