/*
 * 远程组件入口（UMD 包入口）：
 * 1 注入本包的 Tailwind 产物与基础样式（组件自己的类名随包发布，不依赖宿主扫描）
 * 2 通过 libReady 注册给 hel
 *
 * Vue / Element Plus / vue-router / pinia / vue-i18n / 有状态的 libs-vben 模块
 * 由宿主在 preFetchLib 前注入到 window。
 */
import { libReady } from 'hel-lib-proxy';
import { LIB_NAME } from './configs/subApp';
import libProperties from './entrance/libProperties';
import '@melt-js/libs-vben/styles';
import './styles/index.css';

libReady(LIB_NAME, libProperties);

console.log(`[comps-vben] remote lib ready: ${LIB_NAME}`);
