import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
const routes: any[] = [
  { path: "/", component: () => import("@/views/front/index/index.vue") },
  { path: "/tags", component: () => import("@/views/front/tags/index.vue") },
  {
    path: "/categories",
    component: () => import("@/views/front/categories/index.vue"),
  },
  {
    path: "/article-detail",
    component: () => import("@/views/front/article/detail.vue"),
  },
  {
    path: "/manage/login",
    component: () => import("@/views/manage/login/index.vue"),
  },
  {
    path: "/manage",
    component: () => import("@/views/manage/index/index.vue"),
    redirect: "/manage/article-release",
    children: [
      {
        path: "/manage/article-release",
        component: () => import("@/views/manage/article/release.vue"),
      },
      {
        path: "/manage/article-list",
        component: () => import("@/views/manage/article/articleList.vue"),
      },
      {
        path: "/manage/article-tag",
        component: () => import("@/views/manage/article/tagList.vue"),
      },
      {
        path: "/manage/article-category",
        component: () => import("@/views/manage/article/categoryList.vue"),
      },
      {
        path: "/manage/set-up",
        component: () => import("@/views/manage/setup/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
router.beforeEach((to, from) => {
  console.log(to)
  if (to.path.indexOf("manage") > -1) {
    //管理页面路由
    if (!store.state.token && to.path.indexOf("login") === -1) {
      router.replace("/manage/login");
    }
  }
  return true;
});

export default router;
