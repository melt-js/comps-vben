import { exposeLib } from 'hel-lib-proxy';

const LIB_NAME = 'comps-vben';

/**
 * hel 消费方 npm 安装本包后 import 到的空壳代理，真正实现由 preFetchLib 注入。
 */
const dtlib = exposeLib(LIB_NAME);

export { dtlib as default, dtlib };
//# sourceMappingURL=entry.js.map
