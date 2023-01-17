import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

const app = createApp({
  data() {
    return {
      api_url: "https://vue3-course-api.hexschool.io/v2/",
      api_path: "asher_api",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkLogin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url).then(() => {
        this.getData();
      });
      // .catch((err) => {
      //   window.location = "login.html";
      // });
    },
  },
  // 取得產品列表
  getData() {
    axios.get(`${api_url}api/${api_path}/admin/products`).then((res) => {
      // 將資料存在products[]
      this.products = res.data.products;
    });
  },
  // 驗證登入
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // axios headers (把token送過去)
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
});

app.mount("#app");
