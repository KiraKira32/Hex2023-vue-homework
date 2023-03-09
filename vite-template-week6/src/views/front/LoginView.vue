<template>
  <h4>登入畫面</h4>
  <form class="form-signin" @submit.prevent="login">
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        v-model="user.username"
        id="floatingInput"
        placeholder="name@example.com"
        required
        autofocus
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        v-model="user.password"
        id="floatingPassword"
        placeholder="Password"
        required
      />
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
      登入
    </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      // 取得使用者的帳號密碼
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const url = `${import.meta.env.VITE_APP_URL}/v2/admin/signin`
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { expired, token } = res.data
          // 存取 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          alert(res.data.message)
          // 轉網址到指定的頁面
          this.$router.push('/admin/products')
        })
        .catch(() => {
          alert('請輸入正確的帳號與密碼')
        })
    }
  }
}
</script>
