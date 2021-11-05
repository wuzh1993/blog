<template>
  <div class="setup">
    <div class="wrap">
      <div class="wrap-item">
        <label for="">昵称：</label>
        <el-input
          v-model="nickName"
          placeholder="请输入昵称"
          class="wrap-item-input"
        />
      </div>
      <div class="wrap-item" style="line-height:50px;">
        <label for="">页脚：</label>
        <div class="wrap-item-info">
          <p v-for="(item, index) in footData" :key="index">
            <el-input
              v-model="item.content"
              placeholder="内容"
              class="wrap-item-input"
            />
            <el-input
              v-model="item.link"
              placeholder="超链接"
              class="wrap-item-input"
            />
            <el-button
              plain
              @click="footData.splice(index, 1)"
              v-if="footData.length > 1"
            >
              <i class="el-icon-delete el-icon-right"></i>删除
            </el-button>
          </p>
          <el-button
            type="primary"
            plain
            class="addbtn"
            @click="footAddClick"
            :style="footData.length > 1 ? 'left:515px' : 'left:420px'"
          >
            <i class="el-icon-plus el-icon-right"></i>新增
          </el-button>
        </div>
      </div>
      <div class="wrap-item" style="line-height:50px;">
        <label for="">展示：</label>
        <div class="wrap-item-info">
          <p v-for="(item, index) in projectData" :key="index">
            <el-input
              v-model="item.name"
              placeholder="名称"
              class="wrap-item-input"
            />
            <el-input
              v-model="item.content"
              placeholder="内容"
              class="wrap-item-input"
            />
            <el-input
              v-model="item.link"
              placeholder="超链接"
              class="wrap-item-input"
            />
            <el-button
              plain
              @click="projectData.splice(index, 1)"
              v-if="projectData.length > 1"
            >
              <i class="el-icon-delete el-icon-right"></i>删除
            </el-button>
          </p>
          <el-button
            type="primary"
            plain
            class="addbtn"
            @click="projectAddClick"
            :style="projectData.length > 1 ? 'right:-95px' : 'right:-60px'"
          >
            <i class="el-icon-plus el-icon-right"></i>新增
          </el-button>
        </div>
      </div>
      <div class="wrap-item">
        <label for="">头像：</label>
        <div class="wrap-item-upload">
          <img v-if="avatar" :src="avatar" class="avatar" />
          <input
            type="file"
            accept="image/gif, image/jpeg,image/jpg,image/png"
            @change="uploadChange"
          />
        </div>
      </div>
      <div class="wrap-item-btn">
        <el-button type="primary" @click="saveClick">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Compressor from "compressorjs";
import { ElMessage } from "element-plus";
import api from "@/service/api";
export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      nickName: "",
      avatar: "",
      footData: [
        {
          content: "",
          link: "",
        },
      ],
      projectData: [
        {
          name: "",
          content: "",
          link: "",
        },
      ],
    });

    const uploadChange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        if (
          file.type !== "image/png" &&
          file.type !== "image/jpg" &&
          file.type !== "image/jpeg"
        ) {
          ElMessage({
            type: "error",
            message: "只能上传jpg,png,jpeg三种格式的图片！",
          });
          return;
        }
        new Compressor(file, {
          maxWidth: 200,
          success(result) {
            const rd = new FileReader();
            rd.readAsDataURL(result);
            rd.onloadend = function(e: any) {
              state.avatar = e.target.result;
            };
          },
        });
      }
    };

    const getUser = () => {
      api.getUser().then((res) => {
        if (res) {
          const { nickName, avatar, footData, projectData } = res.data;
          state.nickName = nickName;
          state.avatar = avatar;
          if ((footData as any).length) {
            state.footData = footData;
          }
          if ((projectData as any).length) {
            state.projectData = projectData;
          }
        }
      });
    };

    const saveClick = () => {
      //保存点击
      const params = {
        nickName: state.nickName,
        avatar: state.avatar,
        footData: JSON.stringify(state.footData),
        projectData: JSON.stringify(state.projectData),
      };
      api.updateUser(params).then((res) => {
        if (res) {
          ElMessage({
            type: "success",
            message: `用户信息保存成功`,
          });
          getUser();
        }
      });
    };

    const footAddClick = () => {
      state.footData.push({
        content: "",
        link: "",
      });
    };

    const projectAddClick = () => {
      state.projectData.push({
        name: "",
        content: "",
        link: "",
      });
    };

    getUser();

    return {
      ...toRefs(state),
      saveClick,
      uploadChange,
      footAddClick,
      projectAddClick,
    };
  },
});
</script>

<style scoped lang="scss">
.setup {
  .wrap {
    width: 700px;
    margin: 0 auto;
    &-item {
      display: flex;
      margin-top: 20px;
      width: 100%;
      line-height: 40px;
      &-input {
        width: 200px;
      }
      &-info {
        position: relative;
        flex: 1;
        .addbtn {
          position: absolute;
          bottom: 5px;
          right: -95px;
        }
        p {
          display: flex;
          margin: 5px 0;
          .el-input {
            margin-right: 10px;
          }
        }
      }
      &-upload {
        width: 178px;
        height: 178px;
        position: relative;
        .avatar {
          width: 100%;
          height: 100%;
          position: absolute;
        }
        input {
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 0;
        }
      }
      label {
        white-space: nowrap;
      }
      &-btn {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
