<template>
  <div class="user-name">
    <span v-if="status === 'loading'">loading...</span>

    <template v-else-if="status === 'login'">
      <router-link to="/user">{{ user.name }}</router-link>
      <a
        href=""
        @click.prevent="handleLoginOut"
      >退出</a>
    </template>

    <router-link
      v-else
      to="/login"
      exact-path
    >Login</router-link>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    //  status(){
    //   return this.$store.getters["loginUser/status"];
    // }等同于下面将vuex中的status数据拿到此文件计算属性中直接调用
    ...mapGetters("loginUser", ["status"]), //mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性：

    ...mapState("loginUser", ["user"]),//传匿名空间和数据 ...mapState(['user'])
  },
  methods: {
    async handleLoginOut () {
      await this.$store.dispatch("loginUser/loginOut");
      this.$router.push("/login");
    },
    // ...mapMutations(['setLoading'])//我们在组件中可以使用mapMutations以代替this.$store.commit('XXX')，是不是很方便呢？
  },
};
</script>

<style scoped>
.user-name {
  display: inline-block;
}
.user-name a,
.user-name span {
  margin-right: 15px;
}
</style>
