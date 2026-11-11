import { exposeLib } from 'hel-lib-proxy';
import { LIB_NAME } from '../configs/subApp.ts';

/**
 * hel 消费方 npm 安装本包后 import 到的空壳代理，真正实现由 preFetchLib 注入。
 */
export const dtlib = exposeLib(LIB_NAME);

export default dtlib;
