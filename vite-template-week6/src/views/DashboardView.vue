<template>
  <div>
    <h3>這是後台的頁面</h3>
  </div>
  <router-link to="/admin/products">後台產品列表</router-link> |
  <router-link to="/admin/orders">後台訂單列表</router-link> |
  <router-link to="/">回前台頁面</router-link> |
  <!-- 登出的功能 -->
  <a href="#" @click.prevent="logout">登出</a>
  <hr />
  <RouterView></RouterView>
</template>

<script>
// 在主板頁面匯入 RouterView 頁面
import { RouterView } from 'vue-router'

export default {
  data () {
    return {
      isLogin: false
    }
  },
  component: {
    RouterView
  },
  methods: {
    // 登出 清空帳號資料
    logout () {
      // 清除 cookie
      document.cookie = `hexToken=; expires=${new Date()};`
      alert('帳號已登出')
      this.$router.push('/login')
    },
    // 驗證
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = token

      if (!token) {
        alert('請登入帳號')
        this.$router.push('/login')
      }

      const url = `${import.meta.env.VITE_APP_URL}/api/user/check`
      this.$http
        .post(url)
        .then((res) => {
          this.isLogin = true
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  // 觸發
  mounted () {
    this.checkLogin()
  }
}
</script>
