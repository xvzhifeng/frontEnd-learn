<template>
  <view>
    <uni-card
        title="test"
        extra="一个测试的card"
        thumbnail=""
        @click="go()"
    >
        test card
    </uni-card>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Content Index page",
    };
  },
  onLoad(option) {
      console.log(option.loading)
      
  },
  methods: {
      go(){

      },
  },
};
</script>

<style>
</style>
