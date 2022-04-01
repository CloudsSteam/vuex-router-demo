import * as userApi from "../api/user";

export default {
  namespaced: true, // 开启命名空间 
  state: {
    loading: false,   //是否在登入
    user: null,
  },
  getters: {    //通过store.getters["loginUser/status"]得知加载状态
    status (state) {
      if (state.loading) {  //正在加载
        return "loading";
      } else if (state.user) {  //拿到值
        return "login";
      } else {
        return "unlogin";   //什么都没干
      }
    },
  },
  mutations: {
    setLoading (state, payload) {  //当前对象的state
      state.loading = payload;
    },
    setUser (state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async login (ctx, payload) {  //store.dispatch("loginUser/login",{loginId:"admin",loginPwd:"123123"});
      ctx.commit("setLoading", true);
      const resp = await userApi.login(payload.loginId, payload.loginPwd);
      ctx.commit("setUser", resp);
      ctx.commit("setLoading", false);
      return resp;
    },
    async whoAmI (ctx) {
      ctx.commit("setLoading", true);
      const resp = await userApi.whoAmI();
      ctx.commit("setUser", resp);
      ctx.commit("setLoading", false);
    },
    async loginOut (ctx) {
      ctx.commit("setLoading", true);
      await userApi.loginOut();
      ctx.commit("setUser", null);
      ctx.commit("setLoading", false);
    },
  },
};
