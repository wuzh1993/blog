<template>
  <div class="login">
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginSubmitClick">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import api from "@/service/api";
var MD5 = require("md5.js");
interface form {
  userName: string;
  password: string;
}

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    let vm: any = null;
    const store = useStore();
    const dialogVisible = ref(props.show);
    const form: form = reactive({
      userName: "",
      password: "",
    });
    const rules: Object = {
      userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    const loginSubmitClick = (): void => {
      //登录
      vm.refs.formRef.validate(async (valid: boolean) => {
        if (valid) {
          const params = {
            userName: form.userName,
            password: new MD5().update(form.password).digest("hex"),
          };
          const res: any = await api.login(params);
          if (res) {
            ElMessage.success({
              message: "登录成功",
              type: "success",
            });
            context.emit("update:show", false);
            const { token } = res.data;
            store.commit("set_token", token);
          }
        }
      });
    };

    onBeforeMount(() => {
      vm = getCurrentInstance(); //获取组件实例
    });

    return {
      dialogVisible,
      form,
      rules,
      loginSubmitClick,
    };
  },
});
</script>

<style scoped lang="scss"></style>
