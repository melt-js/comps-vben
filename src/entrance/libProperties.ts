/*
 * 远程组件对外能力。
 *
 * comps-vben 体量较大，按子路径拆成命名空间导出，避免 shadcn-ui / common-ui
 * 里同名组件在扁平对象里互相覆盖；宿主通过 window.__COMPS_VBEN__ 读取。
 */
import * as commonUi from '../common-ui';
import * as commonUiTippy from '../common-ui/components/tippy';
import * as layouts from '../layouts';
import * as menuUi from '../menu-ui';
import * as plugins from '../plugins';
import * as shadcnUi from '../shadcn-ui';
import * as pluginsEcharts from '../plugins/echarts';
import * as pluginsMotion from '../plugins/motion';
import * as pluginsTiptap from '../plugins/tiptap';
import * as pluginsVxeTable from '../plugins/vxe-table';
import { LIB_NAME } from '../configs/subApp';

export { LIB_NAME };

export {
  commonUi,
  commonUiTippy,
  layouts,
  menuUi,
  plugins,
  shadcnUi,
  pluginsEcharts,
  pluginsMotion,
  pluginsTiptap,
  pluginsVxeTable,
};

export default {
  LIB_NAME,
  commonUi,
  commonUiTippy,
  layouts,
  menuUi,
  plugins,
  shadcnUi,
  pluginsEcharts,
  pluginsMotion,
  pluginsTiptap,
  pluginsVxeTable,
};
