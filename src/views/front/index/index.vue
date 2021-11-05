<template>
  <div class="index">
    <Topbar @topBtnClick="topBtnClick" />
    <div class="info">
      <el-affix :offset="70">
        <div class="info-item articleList hidden-sm-and-down">
          <ArticleList
            :list="articleList"
            :totalCount="articleCount"
            @pageChange="pageChange"
            @ArticleChange="ArticleChange"
          />
        </div>
      </el-affix>
      <div class="info-item article" v-loading="articleLoading">
        <ArticleDetails :articleContent="currentArticle" />
      </div>
      <el-affix :offset="70">
        <div class="info-item user hidden-sm-and-down">
          <User :articleCount="articleCount" />
        </div>
      </el-affix>
    </div>
    <div class="footer">
      <a
        v-for="(item, index) in userInfo.footData"
        :key="index"
        :href="item.link"
        target="_blank"
      >
        {{ item.content }}
      </a>
    </div>
    <el-drawer
      v-model="showDrawer"
      :with-header="false"
      :direction="drawerText"
    >
      <div class="drawer-container">
        <ArticleList
          :list="articleList"
          :totalCount="articleCount"
          @pageChange="pageChange"
          @ArticleChange="ArticleChange"
          v-if="drawerText === 'ltr'"
        />
        <User :articleCount="articleCount" v-else />
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import Topbar from "@/components/Topbar.vue";
import ArticleList from "./components/ArticleList.vue";
import User from "./components/User.vue";
import ArticleDetails from "../article/detail.vue";
import api from "@/service/api";

export default defineComponent({
  name: "Index",
  components: {
    Topbar,
    ArticleList,
    User,
    ArticleDetails,
  },
  setup() {
    const store = useStore();

    const state = reactive({
      articleList: [],
      articleCount: 0,
      currentArticle: {},
      editorHeight: "500px",
      showDrawer: false,
      drawerText: "ltr",
      page: 1,
      pageSize: 10,
      articleLoading: false,
    });

    const userInfo = computed(() => store.state.userInfo);

    const getUser = async function() {
      const data: any = await api.getUserInfo();
      if (data) {
        store.commit("set_userInfo", data.data);
        getArticlesByUserId();
      }
    };

    const getArticlesByUserId = async function() {
      const params = {
        id: userInfo.value._id,
        page: state.page,
        pageSize: state.pageSize,
      };
      const data: any = await api.getArticlesByUserId(params);
      state.articleList = data.data.list;
      state.articleCount = data.data.totalCount;
      if (state.articleList.length) {
        getArticleById((state.articleList[0] as any)._id);
      }
    };

    const getArticleById = async function(id: any) {
      const params = { id };
      state.articleLoading = true;
      const data: any = await api.getArticleById(params);
      state.articleLoading = false;
      if (data) state.currentArticle = data.data;
    };

    const computeEditorHeight = () => {
      const windowH = document.documentElement.clientHeight;
      state.editorHeight = windowH - 80 + "px";
    };

    const topBtnClick = (e: any) => {
      console.log(e);
      state.showDrawer = true;
      state.drawerText = e;
    };

    const pageChange = (e: any) => {
      state.page = e;
      getArticlesByUserId();
    };

    const ArticleChange = (e: any) => {
      state.currentArticle = "";
      getArticleById(e);
    };

    computeEditorHeight();
    getUser();
    return {
      ...toRefs(state),
      topBtnClick,
      pageChange,
      ArticleChange,
      userInfo,
    };
  },
});
</script>
<style>
.el-drawer {
  width: 65% !important;
}
</style>
<style scoped lang="scss">
.index {
  .info {
    display: flex;
    align-items: flex-start;
    &-item {
      min-height: 40vh;
      background: var(--background-color);
      box-shadow: var(--box-shadow);
      padding: 10px 10px;
      transition: all 0.5s;
      &:hover {
        box-shadow: var(--box-shadow-hover);
      }
    }
    .articleList {
      width: 260px;
      flex: 0 0 260px;
    }
    .user {
      width: 260px;
      flex: 0 0 260px;
    }
    .article {
      padding: 0;
      flex: 1;
      height: auto;
      margin: 0 10px 10px;
      min-height: calc(100vh - 110px);
    }
  }
  .drawer-container {
    padding: 20px;
  }
  .footer {
    display: flex;
    justify-content: center;
    padding: 0px 0 10px;
    a {
      color: #666;
      font-size: 12px;
      text-decoration: none;
      padding: 0 5px;
    }
  }
}
</style>
