<template>
  <div class="topbar">
    <div class="topbar-main">
      <el-row :gutter="20">
        <el-col :xs="5" :sm="5" :md="5">
          <div class="topbar-left hidden-md-and-up" v-if="showBtn">
            <el-icon @click="$emit('topBtnClick', 'ltr')">
              <fold></fold>
            </el-icon>
          </div>
        </el-col>
        <el-col :xs="14" :sm="14" :md="14">
          <div class="topbar-content">{{ userInfo.nickName }}-个人技术博客</div>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5">
          <div class="topbar-right hidden-md-and-up" v-if="showBtn">
            <el-icon @click="$emit('topBtnClick', 'rtl')">
              <fold></fold>
            </el-icon>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { Fold } from "@element-plus/icons";
export default defineComponent({
  components: {
    Fold,
  },
  props: {
    showBtn: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["topBtnClick"],
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.userInfo);
    return { userInfo };
  },
});
</script>

<style scoped lang="scss">
.topbar {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: var(--background-color);
  &-main {
    max-width: 1280px;
    margin: 0 auto;
    height: 100%;
    line-height: 60px;
    font-size: 16px;
  }
  &-left,
  &-right {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-content {
    display: flex;
    align-items: center;
  }
  &-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
