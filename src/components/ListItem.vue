<template>
  <div class="article-item">
    <div class="item">
      <h4>{{ info.title }}</h4>
      <div class="item-bill">
        <div class="time">
          <el-icon>
            <Timer />
          </el-icon>
          {{ dayJs(info.createdAt).format("YYYY-MM-DD") }}
        </div>
        <div class="category">
          <span class="iconfont icon-leimupinleifenleileibie2"></span>
          {{ category[info.category[0]] }}
        </div>
        <div class="list-tag">
          <span class="iconfont icon-pricetags-sharp"></span>
          <span v-for="item in info.tag" :key="item">{{ tag[item] }}</span>
        </div>
      </div>
      <p>
        {{ info.brief_content }}
      </p>
      <div class="item-bottom">
        <div class="view">
          <el-icon>
            <View />
          </el-icon>
          200
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { View, Timer } from "@element-plus/icons";
var dayjs = require("dayjs");
export default defineComponent({
  components: {
    View,
    Timer,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const dayJs: any = dayjs;
    const store = useStore();
    const category = computed(() => store.getters.category);
    const tag = computed(() => store.getters.tag);
    return {
      dayJs,
      category,
      tag,
    };
  },
});
</script>

<style scoped lang="scss">
.article-item {
  cursor: pointer;
  .item {
    width: 100%;
    background: #fff;
    background: var(--background-color);
    box-shadow: var(--box-shadow);
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    transition: all 0.5s ease;
    &:hover {
      box-shadow: var(--box-shadow-hover);
    }
    &-bill {
      display: flex;
      align-items: center;
      color: #86909c;
      font-size: 14px;
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
          margin-right: 3px;
        }
      }
    }
    &-bottom {
      display: flex;
      align-items: center;
      padding-top: 10px;
      color: #86909c;
      font-size: 14px;
      div {
        display: flex;
        align-items: center;
      }
      .el-icon {
        margin-right: 3px;
      }
    }
    p {
      color: #86909c;
      font-size: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-top: 10px;
    }
    h4 {
      color: #1d2129;
      font-size: 18px;
      padding: 5px 0 8px;
    }
  }
}
</style>
