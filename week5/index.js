const apiUrl = "https://vue3-course-api.hexschool.io";
const apiPath = "asher_api";

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  // validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

// 產品列表的元件
const productModal = {
  // 當 id 變動時，取得遠端資料，並呈現 Modal
  props: ["id", "addToCart", "openModal"],
  data() {
    return {
      mmodal: {},
      tempProduct: {},
      qty: 1,
    };
  },
  template: "#userProductModal",
  // 使用 watch 監聽 props的值
  watch: {
    id() {
      if (this.id) {
        axios
          .get(`${apiUrl}/v2/api/${apiPath}/product/${this.id}`)
          .then((res) => {
            this.tempProduct = res.data.product;
            this.modal.show();
          })
          .catch((err) => {
            alert("err.data.message");
          });
      }
    },
  },
  methods: {
    // 關閉modal
    hide() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
    // 監聽 DOM，當 Modal 關閉的時候，要做其他的事情
    this.$refs.modal.addEventListener("hidden.bs.modal", (event) => {
      this.openModal(""); // 從外層更改 id
    });
  },
};

const app = Vue.createApp({
  data() {
    return {
      products: [],
      productId: "",
      cart: {},
      cartStatus: false,
      loadingItem: "", // 存 id
      loadingStatus: {
        isLoading: "",
      },
      // 表單驗證內容
      user: {},
      message: "",
    };
  },
  methods: {
    getProducts() {
      axios
        .get(`${apiUrl}/v2/api/${apiPath}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 打開商品的詳細資料
    openModal(id) {
      this.productId = id;
    },
    // 加入購物車 (產品名稱, 數量) /v2/api/{api_path}/cart
    addToCart(product_id, qty = 1) {
      // 當沒有傳入參數時，會使用預設值
      // this.loadingStatus.isLoading = id;
      const data = {
        product_id,
        qty,
      };
      axios
        .post(`${apiUrl}/v2/api/${apiPath}/cart`, { data })
        .then((res) => {
          this.$refs.productModal.hide();
          this.getCarts();
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
    // 取得購物車資料
    getCarts() {
      // 區塊 || 全畫面的讀取
      axios
        .get(`${apiUrl}/v2/api/${apiPath}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          if (this.cart.carts === 0) {
            this.cartStatus = false;
          } else {
            this.cartStatus = true;
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 購物車調整數量
    updataCartNum(item) {
      // 購物車的 id, 產品名稱的 id
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.loadingItem = item.id;
      axios
        .put(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`, { data })
        .then((res) => {
          alert("更新購物車成功");
          this.getCarts();
          this.loadingItem = "";
        });
    },
    // 刪除購物車單一內容
    deleteProductNum(item) {
      this.loadingItem = item.id;
      axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`).then(() => {
        alert("刪除成功");
        this.getCarts();
        this.loadingItem = "";
      });
    },
    // 清空購物車
    deleteAllProduct() {
      axios
        .delete(`${apiUrl}/v2/api/${apiPath}/carts`)
        .then((res) => {
          alert("購物車已清空");
          this.getCarts();
        })
        .catch((err) => {
          alert("請將商品加入購物車");
        });
    },
    // 電話驗證
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value)
        ? true
        : "需要正確的電話號碼,範例: 0978197878";
    },
    // 送出訂單
    onSubmit() {
      const data = {
        user: {
          name: "test",
          email: "test@gmail.com",
          tel: "0912346768",
          address: "kaohsiung",
        },
        message: "這是留言",
      };
      if (this.cart.carts.length === 0) {
        alert("請先加商品加入購物車");
        return;
      }
      axios
        .post(`${apiUrl}/v2/api/${apiPath}/order`, { data })
        .then((res) => {
          alert("訂單建立成功");
          this.$refs.form.resetForm();
          this.message = "";
          this.getCarts();
        })
        .catch((err) => {
          alert("error");
        });
    },
  },
  components: {
    productModal,
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
