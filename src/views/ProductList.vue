<template>
  <div class="product-list-page page">
    <div class="total-text">搜索到了{{ total }}款产品</div>
    <div class="item-list">
      <div v-for="item in items" class="item" :key="item.id">
        <img :src="item.thumbnail_pic">
        <div class="name">{{ item.name }}</div>
        <div class="price">价格：￥{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { list_product } from "@/api/product";
export default {
  name: "ProductListPage",
  data() {
    return {
      total: 0,
      items: []
    };
  },
  created() {
    list_product().then(res => {
      console.log(res, res.result.count);
      this.total = res.result.count;
      this.items = res.result.list;
    });
  }
};
</script>
<style lang="scss">
@mixin text-ellipsis() {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.product-list-page {
  .total-text {
    color: #333;
    text-align: center;
    font-size: 18px;
    font-weight: normal;
    line-height: 50px;
  }

  .item-list {
    overflow: hidden;

    .item {
      width: 25%;
      padding: 20px;
      float: left;
      text-align: center;

      img {
        max-width: 100%;
      }

      .name {
        @include text-ellipsis;
      }

      .price {
        color: #f40;
      }
    }
  }
}
</style>