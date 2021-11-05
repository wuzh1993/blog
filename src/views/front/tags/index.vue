<template>
  <div class="tags">
    <Topbar :showBtn="false" />
    <div class="info">
      <div class="tags-top">
        <el-tag
          v-for="(item, index) in tagsList"
          :key="index"
          class="tags-tag"
          :effect="currentIndex === index ? 'dark' : 'plain'"
          @click="tagClick(item, index)"
          >{{ item.name }}</el-tag
        >
      </div>
      <div class="tags-content" v-loading="articleLoading">
        <ListItem
          :info="item"
          v-for="item in articleList"
          :key="item._id"
          @click="gotoArticleDetail(item._id)"
        />
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          v-model:page-size="pageSize"
          v-model:current-page="page"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import api from "@/service/api";
import Topbar from "@/components/Topbar.vue";
import ListItem from "@/components/ListItem.vue";

export default defineComponent({
  name: "Tags",
  components: {
    Topbar,
    ListItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      currentIndex: 0,
      articleList: [],
      pageSize: 10,
      page: 1,
      totalCount: 0,
      articleLoading: false,
      id: "",
    });
    const tagsList = computed(() => store.state.userInfo.tag);
    const userInfo = computed(() => store.state.userInfo);
    const init = () => {
      const currentId: any = route.query.id;
      tagsList.value.map((item: any, index: any) => {
        if (item._id === currentId) {
          state.currentIndex = index;
        }
      });
      state.id = currentId;
      getArticleByTagId();
    };
    const tagClick = (item: any, index: any) => {
      state.currentIndex = index;
      state.id = item._id;
      state.page = 1;
      getArticleByTagId();
    };

    const getArticleByTagId = async () => {
      const params = {
        id: state.id,
        page: state.page,
        pageSize: state.pageSize,
      };
      state.articleLoading = true;
      const data: any = await api.getArticleByTagId(params);
      state.articleLoading = false;
      if (data) {
        state.articleList = data.data.list;
        state.totalCount = data.data.totalCount;
      }
    };

    const gotoArticleDetail = (id: any) => {
      router.push({
        path: "/article-detail",
        query: {
          id,
        },
      });
    };

    watch(
      () => state.page,
      () => {
        getArticleByTagId();
      }
    );

    init();

    return {
      ...toRefs(state),
      userInfo,
      tagsList,
      tagClick,
      gotoArticleDetail,
    };
  },
});
</script>

<style scoped lang="scss">
.tags {
  .info {
    max-width: 800px;
  }
  &-top {
    ul {
      width: 100%;
      display: flex;
      li {
        padding: 2px 8px;
        font-size: 12px;
        border-radius: 5px;
        color: #fff;
        background-color: rgb(248, 178, 106);
        margin: 0 4px 10px;
        cursor: pointer;
        transition: all 0.5s;
        a {
          color: #fff;
          text-decoration: none;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  &-content {
    padding: 20px 10px;
  }
  &-tag {
    margin: 5px;
    cursor: pointer;
  }
}
.pagination {
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
