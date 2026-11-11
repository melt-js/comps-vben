(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hel-lib-proxy')) :
	typeof define === 'function' && define.amd ? define(['exports', 'hel-lib-proxy'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["comps-vben"] = {}, global.HelLibProxy));
})(this, (function (exports, helLibProxy) { 'use strict';

	const LIB_NAME = 'comps-vben';

	/**
	 * hel 消费方 npm 安装本包后 import 到的空壳代理，真正实现由 preFetchLib 注入。
	 */
	const dtlib = helLibProxy.exposeLib(LIB_NAME);

	exports.default = dtlib;
	exports.dtlib = dtlib;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=entry.js.map
