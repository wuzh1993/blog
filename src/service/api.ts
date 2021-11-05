import request from "./request";

export default {
  getUserInfo: () => request.get("/front/getUserInfo"), //前端获取用户信息
  getArticlesByUserId: (params: object) =>
    request.get(`/front/getArticlesByUserId`, { params }), //前端通过用户id获取文章列表
  getArticleById: (params: any) =>
    request.get(`/front/getArticleById`, { params }), //前端通过文章id获取文章详情
  getArticleByTagId: (params: any) =>
    request.get("/front/getArticleByTagId", { params }), //前端通过tagid获取文章列表
  getArticleByCategoryId: (params: any) =>
    request.get("/front/getArticleByCategoryId", { params }), //前端通过categoryid获取文章列表
  getUser: () => request.get(`/manage/user/getUser`),
  updateUser: (data: object) => request.post("/manage/user/updateUser", data),
  login: (data: object) => request.post("/manage/user/login", data), //登录
  getTags: (): any => request.get("/manage/tag"), //获取tag
  addTag: (data: object) => request.post("/manage/tag", data), //增加tag
  deleteTag: (data: any) => request.delete(`/manage/tag/${data.id}`, data), //删除tag
  updateTag: (data: any) =>
    request.put(`/manage/tag/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }), //更新tag
  getCategories: (): any => request.get("/manage/category"), //获取分类
  deleteCategory: (data: any): any =>
    request.delete(`/manage/category/${data.id}`), //删除分类
  updateCategory: (data: any) =>
    request.put(`/manage/category/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }), //更新tag
  addCategory: (data: object) => request.post("/manage/category", data), //新增分类
  addArticle: (data: object) => request.post("/manage/article", data), //新增文章
  deleteArticle: (data: any) =>
    request.delete(`/manage/article/${data.id}`, data), //新增文章
  getArticles: (params: object): any =>
    request.get("/manage/article", { params }), //获取文章列表
  getArticle: (data: any): any =>
    request.get(`/manage/article/${data.id}`, data), //获取文章详情
  updateArticle: (data: any): any =>
    request.put(`/manage/article/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }), //更新文章
};
