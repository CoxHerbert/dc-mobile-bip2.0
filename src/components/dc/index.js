import dcScanCode from './components/dc-scan-code/index.vue';
import dcView from './components/dc-view/index.vue';
import dcDictKey from './components/dc-dict-key/index.vue';
import dcTabs from './components/dc-tabs/index.vue';
import dcDictPopup from './components/dc-select-popup/index.vue';
import dcSelectDict from './components/dc-select-dict/index.vue';
import dcNumber from './components/dc-number/index.vue';
import dcWeight from './components/dc-weight/index.vue';
import wfSelectDialog from './components/wf-select-dialog/wf-select-dialog.vue';
import wfSelectSingle from './components/wf-select-single/wf-select-single.vue';
import dcInputScan from './components/dc-input-scan/index.vue';
import dcDragButton from './components/dc-drag-button/index.vue';
import dcPagination from './components/dc-pagination/index.vue';
import dcField from './components/dc-field/index.vue';
import dcRadio from './components/dc-radio/index.vue';
import dcScanV2 from './components/dc-scan-v2/index.vue';

const components = {
  'dc-scan-code': dcScanCode,
  'dc-view': dcView,
  'dc-dict-key': dcDictKey,
  'dc-tabs': dcTabs,
  'dc-select-popup': dcDictPopup,
  'dc-select-dict': dcSelectDict,
  'dc-number': dcNumber,
  'dc-weight': dcWeight,
  'dc-select-dialog': wfSelectDialog,
  'dc-select-single': wfSelectSingle,
  'dc-input-scan': dcInputScan,
  'dc-drag-button': dcDragButton,
  'dc-pagination': dcPagination,
  'dc-field': dcField,
  'dc-radio': dcRadio,
  'dc-scan-v2': dcScanV2,
};

export default {
  install(app) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
