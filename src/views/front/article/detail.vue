<template>
  <div class="article">
    <Topbar :showBtn="false" v-if="!articleContent" />
    <div
      class="info"
      :style="articleContent ? 'padding:0px 5px 0' : 'padding:70px 5px 0'"
    >
      <div class="article-top">
        <div class="article-top-title">
          {{ currentArticle.title }}
        </div>
        <div class="article-bill" v-if="currentArticle">
          <div class="time">
            <el-icon>
              <Timer />
            </el-icon>
            {{ dayJs(currentArticle.createdAt).format("YYYY-MM-DD") }}
          </div>
          <div class="category">
            <span class="iconfont icon-leimupinleifenleileibie2"></span>
            {{
              currentArticle &&
                currentArticle.category &&
                currentArticle.category[0].name
            }}
          </div>
          <div class="list-tag">
            <span class="iconfont icon-pricetags-sharp"></span>
            <span v-for="item in currentArticle.tag" :key="item._id">{{
              item.name
            }}</span>
          </div>
        </div>
      </div>
      <v-md-editor
        v-model="currentArticle.content"
        mode="preview"
      ></v-md-editor>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import api from "@/service/api";
import { useRoute } from "vue-router";
import { Timer } from "@element-plus/icons";
import Topbar from "@/components/Topbar.vue";
var dayjs = require("dayjs");
export default defineComponent({
  components: {
    Topbar,
    Timer,
  },
  props: {
    articleContent: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();
    const dayJs: any = dayjs;
    const state = reactive({ currentArticle: {} });

    const init = () => {
      if (props.articleContent) {
        state.currentArticle = computed(() => props.articleContent);
        console.log(state.currentArticle);
        return;
      }
      const id = route.query.id;
      getArticleById(id);
    };

    const getArticleById = async function(id: any) {
      const params = { id };
      const data: any = await api.getArticleById(params);
      if (data) state.currentArticle = data.data;
    };

    init();
    return {
      ...toRefs(state),
      dayJs,
    };
  },
});
</script>
<style scoped lang="scss">
.article {
  &-top {
    padding: 10px 10px 20px;
    &-title {
      font-size: 26px;
      font-weight: bold;
      text-align: center;
    }
  }
  &-bill {
    display: flex;
    align-items: center;
    color: #86909c;
    font-size: 16px;
    justify-content: center;
    padding-top: 15px;
    .el-icon {
      margin-right: 10px;
    }
    .category {
      position: relative;
      padding: 0 20px;
      &::before,
      &::after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 1px;
        height: 14px;
        background: #e5e6eb;
        content: " ";
      }
      &::before {
        left: 10px;
      }
      &::after {
        right: 10px;
      }
    }
    .list-tag span {
      margin-right: 5px;
    }
    div {
      display: flex;
      align-items: center;
      .iconfont {
        margin-right: 10px;
      }
    }
  }
}
</style>
