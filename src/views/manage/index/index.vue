<template>
  <el-container>
    <el-header>
      <el-row :gutter="10">
        <el-col :xs="5" :sm="5" :md="5"></el-col>
        <el-col :xs="14" :sm="14" :md="14">博客后台管理</el-col>
        <el-col :xs="5" :sm="5" :md="5">
          <div class="header-btn">
            <span>
              <el-button plain size="small" @click="loginOut">登出</el-button>
            </span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="main">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="menuActive"
          router
        >
          <el-sub-menu index="1">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/manage/article-release"
              >发布文章</el-menu-item
            >
            <el-menu-item index="/manage/article-list">文章列表</el-menu-item>
            <el-menu-item index="/manage/article-tag">标签列表</el-menu-item>
            <el-menu-item index="/manage/article-category"
              >分类列表</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item index="/manage/set-up">
            <i class="el-icon-setting"></i>
            <span>账户设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    let menuActive = ref<string>("");
    const loginOut = () => {
      localStorage.clear();
      router.replace("/manage/login");
    };
    watch(
      () => route.path,
      (val) => {
        (menuActive as any) = val;
      },
      {
        immediate: true,
      }
    );
    return {
      menuActive,
      loginOut,
    };
  },
});
</script>
<style scoped lang="scss">
.el-header {
  height: 60px;
  line-height: 60px;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: var(--background-color);
}
.main {
  min-height: calc(100vh - 65px);
  margin-top: 5px;
}
.el-aside ul {
  height: 100%;
}
.header-btn {
  float: right;
}
</style>
