<template>
  <div class="user">
    <div class="user-person">
      <img :src="userInfo.avatar" alt class="user-avatar" />
      <div class="name">{{ userInfo.nickname }}</div>
      <div class="class">
        <div class="class-item">
          <h3>{{ articleCount }}</h3>
          <p>文章</p>
        </div>
        <div class="class-line"></div>
        <div class="class-item">
          <h3>{{ (userInfo.tag && userInfo.tag.length) || 0 }}</h3>
          <p>标签</p>
        </div>
      </div>
    </div>
    <div class="user-bition">
      <p v-for="(item, index) in userInfo.projectData" :key="index">
        <span>{{ item.name }}:</span>
        <span>
          <a :href="item.link" target="_blank">{{ item.content }}</a>
        </span>
      </p>
    </div>
    <hr />
    <div class="user-cate">
      <h4><span class="iconfont icon-leimupinleifenleileibie2"></span>分类</h4>
      <ul>
        <router-link
          :to="{ path: '/categories', query: { id: item._id } }"
          v-for="(item, index) in userInfo.category"
          :key="index"
        >
          <li>
            <div class="name">
              {{ item.name }}
            </div>
            <div
              class="num"
              :style="{
                backgroundColor: solveColor(['#E15B64', '#F8B26A']),
              }"
            >
              {{ item.articleNum }}
            </div>
          </li>
        </router-link>
      </ul>
      <div class="cate-empty" v-if="!userInfo.category.length">
        暂无分类
      </div>
    </div>
    <hr />
    <div class="user-tags">
      <h4><span class="iconfont icon-pricetags-sharp"></span>标签</h4>
      <ul>
        <li
          v-for="(item, index) in userInfo.tag"
          :key="index"
          :style="{
            backgroundColor: solveColor([
              '#3498DB',
              '#ABBD81',
              '#849B87',
              '#67CC86',
              '#849B87',
            ]),
          }"
        >
          <router-link :to="{ path: '/tags', query: { id: item._id } }">{{
            item.name
          }}</router-link>
        </li>
      </ul>
      <div class="tags-empty" v-if="!userInfo.tag.length">暂无标签</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    articleCount: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.userInfo);
    const solveColor = function(colors: Array<string>): string {
      //返回随机颜色
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };
    return {
      userInfo,
      solveColor,
    };
  },
});
</script>
<style scoped lang="scss">
.user {
  user-select: none;
  &-bition {
    color: var(--text-color);
    padding: 5px 0 10px;
    p {
      padding-bottom: 10px;
      a {
        color: #409eff;
        padding-left: 10px;
      }
    }
  }
  &-person {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--text-color);
    padding-bottom: 20px;
    .name {
      text-align: center;
      padding: 15px 0;
      font-size: 16px;
    }
    .class {
      display: flex;
      text-align: center;
      width: 100%;
      &-item {
        flex: 1;
        box-sizing: border-box;
        h3 {
          font-size: 20px;
        }
        p {
          margin-top: 10px;
          font-size: 16px;
        }
      }
      &-line {
        width: 1px;
        background-color: #333;
      }
    }
  }
  &-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  &-cate {
    padding: 20px 0;
    a {
      color: #333;
      text-decoration: none;
    }
    ul li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 10px 10px;
      transition: all 0.5s;
      border-radius: 5px;
      box-shadow: var(--box-shadow);
      background-color: var(--background-color);
      cursor: pointer;
      &:hover {
        transform: scale(1.02);
      }
    }
    .name {
    }
    .num {
      padding: 2px 10px;
      border-radius: 2px;
      color: #fff;
      font-size: 12px;
    }
  }
  &-tags {
    padding: 20px 0 0;
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
  h4 {
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    span {
      color: #666;
      font-size: 16px;
      margin-right: 5px;
    }
  }
}
</style>
