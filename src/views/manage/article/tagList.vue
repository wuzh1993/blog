<template>
  <div class="topbar">
    <el-button type="primary" icon="el-icon-check" @click="addClick"
      >新增</el-button
    >
  </div>
  <el-table :data="tagsList" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="操作">
      <template #default="scope">
        <el-popconfirm
          :title="'确定删除该标签?'"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="deleteClick(scope)"
        >
          <template #reference>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-popconfirm>

        <el-button type="text" size="small" @click="editClick(scope)"
          >重命名</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/service/api";
var dayjs = require("dayjs");
export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      tagsList: [],
    });

    const getTags = () => {
      api.getTags().then((res: any) => {
        console.log(res);
        if (res) {
          const { list } = res.data;
          list.forEach((element: any) => {
            element.date = dayjs(element.createdAt).format("YYYY-MM-DD");
          });
          state.tagsList = list;
        }
      });
    };

    const deleteClick = (scope: any) => {
      //删除点击
      const id = scope.row._id;
      const params = {
        id,
      };
      api.deleteTag(params).then((res) => {
        if (res) {
          ElMessage({
            type: "success",
            message: `标签删除成功`,
          });
          getTags();
        }
      });
    };

    const editClick = (scope: any) => {
      //编辑点击
      ElMessageBox.prompt("", `请输入标签名称`, {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputPattern: /\S$/,
        inputErrorMessage: `标签名不能为空`,
        inputValue: scope.row.name,
      })
        .then(({ value }) => {
          const id = scope.row._id;
          const params = {
            id,
            name: value,
          };

          api.updateTag(params).then((res: any) => {
            if (res) {
              ElMessage({
                type: "success",
                message: `标签重命名成功`,
              });
              getTags();
            }
          });
        })
        .catch(() => {});
    };

    const addClick = async () => {
      ElMessageBox.prompt("", `请输入标签名称`, {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputPattern: /\S$/,
        inputErrorMessage: `标签名不能为空`,
      })
        .then(({ value }) => {
          const params = {
            name: value,
          };
          api.addTag(params).then((res: any) => {
            if (res) {
              ElMessage({
                type: "success",
                message: `标签增加成功`,
              });
              getTags();
            }
          });
        })
        .catch(() => {});
    };

    getTags();

    return {
      ...toRefs(state),
      deleteClick,
      editClick,
      addClick,
    };
  },
});
</script>
<style scoped lang="scss">
.topbar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
