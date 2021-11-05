import axios from "axios";
import { ElMessage } from "element-plus";
import qs from "qs";
import store from "@/store";
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:7001"
      : "http://www.wzhcode.com:7001",
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log(config);
    if (store.state.token)
      (config.headers as any).authtoken = store.state.token;
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { data }: any = response;
    if (data.code !== 0) {
      ElMessage({
        showClose: true,
        message: data.error,
        type: "error",
      });
      return false;
    } else {
      return data;
    }
  },
  (err) => {
    ElMessage({
      showClose: true,
      message: err,
      type: "error",
    });
  }
);

export default instance;
