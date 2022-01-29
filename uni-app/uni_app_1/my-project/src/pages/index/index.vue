<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <button
      :disabled="false"
      :loading="loading"
      open-type=""
      hover-class="button-hover"
      @click="goto('/pages/content/index')"
    >
      内容页面
    </button>

    <view class="item" v-for="(value, index) in iconType" :key="index">
      <icon :type="value" size="26" />
      <!-- <text>{{ value }}</text> -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      loading: false,
	  iconType: ['success']
    };
  },
  onshow() {
	  this.loading = false;
	  console.log("content onshow()")
  },
  onLoad() {
	  console.log("content onLoad()")
	  // #ifdef APP-PLUS|| MP-WEIXIN
         this.iconType = ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search','clear']
  },
  methods: {
    goto(url) {
      this.loading = true;
      let go = uni.navigateTo({
          url:url+`?loading=${this.loading}`,
		  success:()=> {
			  console.log(this.loading)
			  this.loading = false;
		  }
      })
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
