<template>這是單一產品
  <h3>{{product.title}}</h3>
  <img :src="product.imageUrl"  class="img-fluild" alt="單品圖像">
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      // 使用結構的方式，取出單一產品的 ID
      const { id } = this.$route.params
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}

</script>
