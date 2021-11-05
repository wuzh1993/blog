<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
html,
body {
  min-height: 100vh;
}
:root {
  --box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  --box-shadow-hover: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  --text-color: #242424;
  --text-color-active: #409eff;
  --text-color-sub: #7f7f7f;
  --border-color: #eaecef;
  --background-color: #fff;
}
hr {
  border: 0;
  border-top: 1px solid var(--border-color);
}
.info {
  max-width: 1280px;
  margin: 0 auto;
  /* overflow-x: hidden; */
  padding: 70px 5px 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
</style>
