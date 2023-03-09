<template>
  這是前台頁面
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/products">產品列表</router-link> |
  <router-link to="/cart">購物車</router-link> |
  <!-- <router-link to="/login">登入</router-link> | -->
  <router-link to="/admin">後台管理</router-link>
  <hr />
  <RouterView></RouterView>
</template>

<script>
// 在主板頁面匯入 RouterView 頁面
import { RouterView } from 'vue-router'
export default {
  component: {
    RouterView
  }
}
</script>
