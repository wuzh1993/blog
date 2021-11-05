import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      userInfo: "",
      token: "",
    };
  },
  getters: {
    category: (state: any) => {
      const { category } = state.userInfo;
      const obj = {};
      category.map((item: any) => {
        obj[item._id] = item.name;
      });
      return obj;
    },
    tag: (state: any) => {
      const { tag } = state.userInfo;
      const obj = {};
      tag.map((item: any) => {
        obj[item._id] = item.name;
      });
      return obj;
    },
  },
  mutations: {
    set_token(state: any, info) {
      state.token = info;
    },
    set_userInfo(state: any, info) {
      state.userInfo = info;
    },
  },
  plugins: [createPersistedState({ storage: window.localStorage })],
});

export default store;
