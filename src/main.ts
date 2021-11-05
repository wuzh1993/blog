import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

/**
 * 引入markdown编辑器
 */
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

import router from "./router";
import store from "./store";

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(VMdEditor);

app.mount("#app");
