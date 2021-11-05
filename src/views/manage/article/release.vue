<template>
  <div class="topbar">
    <el-button type="primary" icon="el-icon-check" @click="releaseClick">{{
      isEdit ? "保存" : "发布"
    }}</el-button>
  </div>
  <div class="content">
    <div class="content-item">
      <div class="content-label">标题：</div>
      <div class="content-wrap">
        <el-input
          v-model="article.title"
          placeholder="请输入文章标题"
          class="content-title-input"
          clearable
        />
      </div>
    </div>
    <div class="content-item">
      <div class="content-label">分类：</div>
      <div class="content-wrap">
        <el-select v-model="article.category" filterable placeholder="选择分类">
          <el-option
            v-for="item in categoryList"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <div class="content-wrap-btn">
          <el-button
            plain
            size="medium"
            type="primary"
            @click="addTagOrCategoryClick('category')"
            ><i class="el-icon-upload el-icon-plus"></i> 新增</el-button
          >
        </div>
      </div>
    </div>
    <div class="content-item">
      <div class="content-label">标签：</div>
      <div class="content-wrap">
        <el-checkbox-group v-model="article.tag" size="medium">
          <el-checkbox
            :label="item._id"
            border
            v-for="item in tagsList"
            :key="item._id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
        <div class="content-wrap-btn">
          <el-button
            plain
            size="medium"
            type="primary"
            @click="addTagOrCategoryClick('tag')"
            ><i class="el-icon-upload el-icon-plus"></i> 新增</el-button
          >
        </div>
      </div>
    </div>
    <div class="content-editor">
      <v-md-editor v-model="article.content" height="480px"></v-md-editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from "vue";
import api from "@/service/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import VueMarkdownEditor, { xss } from "@kangc/v-md-editor";
export default defineComponent({
  setup() {
    const route = useRoute();
    const state = reactive({
      article: {
        title: "",
        content: "",
        tag: [],
        category: [],
      },
      tagsList: [] as any[],
      categoryList: [] as any[],
      isEdit: false,
    });

    const articleId = computed(() => (route as any).query.id);

    const addTagOrCategoryClick = (type: string) => {
      const text = type === "tag" ? "标签" : "分类";
      ElMessageBox.prompt("", `请输入${text}名称`, {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputPattern: /\S$/,
        inputErrorMessage: `${text}不能为空`,
      })
        .then(({ value }) => {
          addTagOrCategory(type, value);
        })
        .catch(() => {});
    };

    const addTagOrCategory = async (type: string, name: string) => {
      //新增tag
      const params = { name };
      let res = null;
      if (type === "tag") {
        res = await api.addTag(params);
      }
      if (type === "category") {
        res = await api.addCategory(params);
      }
      if (res) {
        const text = type === "tag" ? "标签" : "分类";
        ElMessage({
          type: "success",
          message: `${text}新增成功`,
        });
        getTagOrCategory(type);
      }
    };

    const getTagOrCategory = async (type: string) => {
      return new Promise((resolve) => {
        //获取tag
        if (type === "tag") {
          api.getTags().then((res: any) => {
            if (res) {
              state.tagsList = res.data.list;
              resolve(res);
            }
          });
        }
        if (type === "category") {
          api.getCategories().then((res: any) => {
            if (res) {
              state.categoryList = res.data.list;
              resolve(res);
            }
          });
        }
      });
    };

    const releaseClick = async () => {
      //发布或保存文章
      const checkRes = formCheck();
      if (checkRes) {
        const { title, content, tag, category } = state.article;
        const html = xss.process(
          VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(content)
        );
        const brief_content = html
          .replace(/<\/?.+?>/g, "")
          .replace(/[\r\n]/g, "")
          .replace(/\s+/g, "");
        const params = {
          title: title,
          content: content,
          tagIds: tag.join(","),
          categoryIds: category,
          brief_content:
            brief_content.length > 100
              ? brief_content.substr(0, 100)
              : brief_content,
        };
        if (state.isEdit) {
          (params as any).id = articleId.value;
        }
        const requestType = state.isEdit ? "updateArticle" : "addArticle";
        const res = await api[requestType](params);
        if (res) {
          ElMessage({
            type: "success",
            message: `文章${state.isEdit ? "更新" : "发布"}成功`,
          });
          !state.isEdit && resetForm();
          state.isEdit && getArticle();
        }
      }
    };

    const getArticle = () => {
      //获取单个文章
      const params = {
        id: articleId.value,
      };
      if (articleId.value) {
        api.getArticle(params).then((res: any) => {
          if (res) {
            const { data } = res;
            state.article.title = data.title;
            state.article.content = data.content;
            state.article.tag = data.tag.map((item: any) => item._id);
            state.article.category = data.category[0]._id;
            state.isEdit = true;
          }
        });
      }
    };

    const formCheck = () => {
      //文章发布前表单check
      try {
        if (!state.article.title) {
          throw "文章标题不能为空";
        }
        if (!state.article.content) {
          throw "文章内容不能为空";
        }
        if (!state.article.category.length) {
          throw "请选择分类";
        }
        if (!state.article.tag.length) {
          throw "请至少选择一个标签";
        }
        return true;
      } catch (error) {
        ElMessage({
          showClose: true,
          message: error,
          type: "error",
        });
      }
      return false;
    };

    const resetForm = () => {
      state.article = {
        title: "",
        content: "",
        tag: [],
        category: [],
      };
    };

    const init = () => {
      Promise.all([getTagOrCategory("tag"), getTagOrCategory("category")]).then(
        () => {
          getArticle();
        }
      );
    };

    watch(
      () => route.query.id,
      () => {
        resetForm();
        state.tagsList = [] as any[];
        state.categoryList = [] as any[];
        state.isEdit = false;
        init();
      },
      {
        immediate: true,
      }
    );

    init();

    return {
      ...toRefs(state),
      releaseClick,
      addTagOrCategoryClick,
    };
  },
});
</script>
<style scoped lang="scss">
.el-checkbox {
  margin-right: 0;
}
.topbar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.content {
  &-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
  &-wrap {
    display: flex;
    &-btn {
      margin-left: 20px;
    }
  }
  &-title {
    &-input {
      width: 400px;
    }
  }
}
</style>
