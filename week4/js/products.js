import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

import pagination from "./pagination.js";

let productModal = {};
let delProductModal = {};

const app = createApp({
  data() {
    return {
      api_url: "https://vue3-course-api.hexschool.io/v2/",
      api_path: "asher_api",
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false, // 確認是編輯或是新增所使用的
      page: {},
    };
  },
  methods: {
    // 取得產品列表
    getProducts(page = 1) {
      //預設參數
      const url = `${this.api_url}api/${this.api_path}/admin/products/?page=${page}`;
      axios.get(url).then((res) => {
        this.products = res.data.products;
        this.page = res.data.pagination;
        console.log(res.data);
      });
    },
    // 建立新的&編輯產品 會打開Modal
    openModal(status, product) {
      // 建立新的產品
      if (status === "create") {
        // 打開Modal
        productModal.show();
        // isNwe 會是新增的品項
        this.isNew = true;
        // 會代入初始化的資料
        this.tempProduct = {
          imagesUrl: [],
        };
        // 編輯舊的產品資訊
      } else if (status === "edit") {
        productModal.show();
        // isNew 會是編輯品項(不是新增)
        this.isNew = false;
        // 會代入當前要編輯的資料
        this.tempProduct = { ...product };
      } else if (status === "delete") {
        delProductModal.show();
        this.tempProduct = { ...product }; //等等取 ID 使用
      }
    },
    // 新增 & 更新 產品內容
    updateProduct() {
      let url = `${this.api_url}api/${this.api_path}/admin/product`;
      // 用 this.isNew 判斷 API 怎麼運行
      let method = "post";
      // 如果isNew不是新增的話 就把上面的 url & method 換掉
      if (!this.isNew) {
        url = `${this.api_url}api/${this.api_path}/admin/product/${this.tempProduct.id}`;
        method = "put";
      }
      axios[method](url, { data: this.tempProduct }).then(() => {
        // 新增完產品 重新取得列表
        this.getProducts();
        // 關閉當前的 Modal
        productModal.hide();
      });
    },
    // 刪除的功能
    deleteProduct() {
      const url = `${this.api_url}api/${this.api_path}/admin/product/${this.tempProduct.id}`;
      axios.delete(url).then(() => {
        this.getProducts();
        delProductModal.hide();
      });
    },
  },
  // 區域註冊
  components: {
    pagination,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // axios headers (把token送過去)
    axios.defaults.headers.common.Authorization = token;
    this.getProducts();

    // Bootstrap 方法
    // 1.初始化 new
    productModal = new bootstrap.Modal("#productModal");
    // 2.呼叫方法 .show, hide
    // productModal.show(); // 確保程式會動
    // 3.刪除內容
    delProductModal = new bootstrap.Modal("#delProductModal");
  },
});

app.mount("#app");
