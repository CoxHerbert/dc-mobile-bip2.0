import { createApp } from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

import App from './App.vue';
import router from './router';
import store from '@/store';
import { createPinia } from 'pinia';

import wfUI from './components/wf-ui';
import dcComponents from './components/dc';
import WfCustomFields from './pages/plugin/workflow/components/custom-fileds/index.js';
import httpInstall from '@/http/install.js';
import http from '@/http/api.js';
import globalFunc from '@/utils/func.js';
import * as wxsdk from '@/utils/wxsdk.js';
import * as wwsdk from '@/utils/wwxsdk.js';

import { createLegacyAdapter, mountLegacyProperties } from './compat/legacy-app';
import { initUniCompat } from './compat/uni-compat.js';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(store);
app.use(Vant);
app.use(dcComponents);
app.use(WfCustomFields);

const legacy = createLegacyAdapter(app);
legacy.use(wfUI);
legacy.use(httpInstall, legacy.globalProperties);
legacy.use(globalFunc, legacy.globalProperties);

mountLegacyProperties(legacy, {
    $http: http,
    $wxsdk: wxsdk,
    $wwsdk: wwsdk,
});

initUniCompat(legacy);

app.mount('#app');
