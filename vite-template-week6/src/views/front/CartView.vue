<template>
  這是購物車頁面
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
        <tbody>
        <!-- 購物車列表 -->
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" :disabled=" item.id === loadingItem"
                  @click="deleteProductNum(item)">
                <i v-if="loadingItem === item.id " class="fas fa-spinner fa-pulse"></i>
                  刪除
                </button>
              </td>
              <td>
                {{ item.product.title }}
              </td>
              <td>
                <div class="input-group input-group-sm">
                <select name="" id="" class="form-control" v-model="item.qty" :disabled=" item.id === loadingItem"
                  @change="updataCartNum(item)">
                  <option :value="i" v-for="i in 10" :key="i+12344">{{ i }}</option>
                </select>
                </div>
                </td>
              <td class="text-end">
                {{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
          <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
    </table>
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click="deleteAllProduct()">清空購物車</button>
    </div>
</template>

<script>
// 環境變數
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      productId: '',
      cart: {},
      cartStatus: false,
      loadingItem: '', // 存 id
      loadingStatus: {
        isLoading: ''
      },
      // 表單驗證內容
      user: {},
      message: ''
    }
  },
  methods: {
    // 取得 購物車資料
    getCarts () {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          if (this.cart.carts === 0) {
            this.cartStatus = false
          } else {
            this.cartStatus = true
          }
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // 更新 購物車調整數量
    updataCartNum (item) {
      // 購物車的 id, 產品名稱的 id
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.loadingItem = item.id
      this.$http
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then((res) => {
          alert('更新購物車成功')
          this.getCarts()
          this.loadingItem = ''
        })
    },
    // 刪除 購物車單一內容
    deleteProductNum (item) {
      this.loadingItem = item.id
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`).then(() => {
        alert('刪除成功')
        this.getCarts()
        this.loadingItem = ''
      })
    },
    // 清空購物車
    deleteAllProduct () {
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          alert('購物車已清空')
          this.getCarts()
        })
        .catch(() => {
          alert('請將商品加入購物車')
        })
    },
    // 電話驗證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value)
        ? true
        : '需要正確的電話號碼,範例: 0978197878'
    },
    // 送出訂單
    onSubmit () {
      const data = {
        user: {
          name: 'test',
          email: 'test@gmail.com',
          tel: '0912346768',
          address: 'kaohsiung'
        },
        message: '這是留言'
      }
      if (this.cart.carts.length === 0) {
        alert('請先加商品加入購物車')
        return
      }
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, { data })
        .then(() => {
          alert('訂單建立成功')
          this.$refs.form.resetForm()
          this.message = ''
          this.getCarts()
        })
        .catch(() => {
          alert('error')
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}

</script>
