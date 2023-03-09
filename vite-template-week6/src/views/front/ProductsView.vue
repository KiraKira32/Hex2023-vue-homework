<template>
  這是產品列表
  <table class="table">
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td> {{ product.title }}</td>
        <td><img :src="product.imageUrl" width="200" alt="產品圖片"></td>
        <td>
          <router-link :to="`/product/${product.id}`"
          class="btn btn-outline-secondary">產品的細節</router-link>
          <br>
          <button type="button" class="btn btn-outline-primary"
            @click="addToCart(product.id)">加入購物車</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  data () {
    return {
      products: [],
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false,
      product: {}
    }
  },
  components: {
    RouterLink
  },
  methods: {
    // 取得  產品列表
    getProducts () {
      this.$http.get(`${import.meta.env.VITE_APP_URL}/v2/api/${import.meta.env.VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 加入  購物車
    addToCart (id, qty = 1) {
      const url = `${import.meta.env.VITE_APP_URL}/v2/api/${import.meta.env.VITE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          alert('商品新增成功')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
