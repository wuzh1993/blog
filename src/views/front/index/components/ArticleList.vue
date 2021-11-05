<template>
  <div class="nav">
    <h4><span class="iconfont icon-list"></span>文章列表</h4>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :class="{ active: activeIndex === index }"
        @click="articleItemClick(item, index)"
      >
        {{ item.title }}
      </li>
    </ul>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        v-model:page-size="pageSize"
        v-model:current-page="page"
      >
      </el-pagination>
    </div>
    <div class="info-article-emp" v-if="!list.length">
      暂无文章
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ["pageChange", "ArticleChange"],
  setup(props, context) {
    const state = reactive({ pageSize: 10, page: 1, activeIndex: 0 });
    const articleItemClick = (item: any, index: any) => {
      state.activeIndex = index;
      context.emit("ArticleChange", item._id);
    };
    watch(
      () => state.page,
      () => {
        state.activeIndex = 0;
        context.emit("pageChange", state.page);
      }
    );
    return { ...toRefs(state), articleItemClick };
  },
});
</script>
<style scoped lang="scss">
.nav {
  user-select: none;
  height: 375px;
  position: relative;
  h4 {
    display: flex;
    align-items: center;
    span {
      color: #666;
      font-size: 14px;
      margin-right: 5px;
    }
  }
  ul {
    padding: 5px 0 0 20px;
    li {
      width: 100%;
      color: #555;
      padding: 5px 0;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover {
        text-decoration: underline;
        color: #409eff;
      }
      &.active {
        text-decoration: underline;
        color: #409eff;
      }
    }
  }
  .pagination {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
