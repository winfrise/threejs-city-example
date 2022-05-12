import { createApp } from 'vue'
import App from './App.vue'

import { TreeSelect, Button } from 'ant-design-vue';

const app = createApp(App)
app.use(TreeSelect)
app.use(Button)
app.mount('#app')
