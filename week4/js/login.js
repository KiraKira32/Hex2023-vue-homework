import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

const api_url = "https://vue3-course-api.hexschool.io/v2/";

const app = createApp({
  data() {
    return {
      // 取得使用者的帳號密碼
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const url = `${api_url}admin/signin`;
      axios
        .post(url, this.user)
        .then((res) => {
          // 解構取出 token , expired(到期日)
          const { expired, token } = res.data;
          // 存取 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          // 轉網址到指定的頁面
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
});
app.mount("#app");
