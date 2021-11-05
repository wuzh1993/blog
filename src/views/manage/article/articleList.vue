<template>
  <div class="wrap">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="createdAt" label="日期" width="180" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="title" label="分类" width="120">
        <template #default="scope">
          <span>{{ scope.row.category[0].name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标签" width="200">
        <template #default="scope">
          <el-tag
            v-for="item in scope.row.tag"
            :key="item._id"
            style="margin-right:5px"
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-popconfirm
            :title="'确定删除该文章?'"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteClick(scope)"
          >
            <template #reference>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-popconfirm>

          <el-button type="text" size="small" @click="editClick(scope)"
            >编辑</el-button
          >
          <!-- <el-button type="text" size="small" @click="viewClick"
            >查看</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
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
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import api from "@/service/api";
var dayjs = require("dayjs");
export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      tableData: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
    });
    const deleteClick = async (scope: any) => {
      const id = scope.row._id;
      scope.row.popVisable = false;
      const params = {
        id,
      };
      const res = await api.deleteArticle(params);
      console.log(res);
      if (res) {
        ElMessage({
          type: "success",
          message: `文章删除成功`,
        });
        getArticles();
      }
    };
    const editClick = (scope: any) => {
      router.push({
        path: "/manage/article-release",
        query: {
          id: scope.row._id,
        },
      });
    };
    const viewClick = () => {};

    const getArticles = async () => {
      const params = { page: state.page, pageSize: state.pageSize };
      const res = await api.getArticles(params);
      if (res) {
        const { list } = res.data;
        list.forEach((element: any) => {
          element.createdAt = dayjs(element.createdAt).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          element.popVisable = false;
        });
        state.tableData = res.data.list;
        state.totalCount = res.data.totalCount;
      }
    };

    watch(
      () => state.page,
      () => {
        getArticles();
      }
    );

    getArticles();

    return { ...toRefs(state), deleteClick, editClick, viewClick };
  },
});
</script>
<style scoped lang="scss">
.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
