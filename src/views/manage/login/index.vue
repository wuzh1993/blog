<template>
  <div class="login">
    <div class="login-title">身份验证</div>
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginSubmitClick" type="primary" style="width:100%"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import api from "@/service/api";
var MD5 = require("md5.js");

interface form {
  userName: string;
  password: string;
}

export default defineComponent({
  setup() {
    let vm: any = null;
    const store = useStore();
    const router = useRouter();
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
            const { token } = res.data;
            store.commit("set_token", token);
            console.log(router)
            router.replace("/manage");
          }
        }
      });
    };

    onBeforeMount(() => {
      vm = getCurrentInstance(); //获取组件实例
    });

    return {
      form,
      rules,
      loginSubmitClick,
    };
  },
});
</script>
<style>
.el-form-item__content {
  display: flex;
  justify-content: center;
}
</style>
<style scoped lang="scss">
.login {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &-title {
    padding: 0 0 30px 80px;
    color: #333;
    text-align: center;
    font-size: 25px;
  }
}
</style>
