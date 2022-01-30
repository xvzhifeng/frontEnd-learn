<template>
  <view class="content">
    <view class="userIconView">
      <cover-image
        src="/static/logo.png"
        class="userIcon"
        @click="gotoUserPage()"
      ></cover-image>
    </view>

    <view class="perWord">
      <text> Hyacinth </text>
    </view>

    <view class="buttonView">
      <view classs="subButtonView1">
        <button :disabled="false" :loading="false" @click="study()">
          <view class="subButtonView1_1">
            <text class="BurronText">Learn</text>
            <text class="BurronTextCount">{{ learnCount }}</text>
          </view>
        </button>
      </view>

      <view classs="subButtonView2">
        <button
          :disabled="false"
          :loading="false"
          @click="review()"
          plain="true"
        >
          <view class="subButtonView1_1">
            <text class="BurronText">Review</text>
            <text class="BurronTextCount">{{ reviewCount }}</text>
          </view>
        </button>
      </view>
    </view>
    <!-- bottom icon -->
    <view class="buttonIcon">
      <uni-icons type="map" size="30" @click="home()" />
      <uni-icons type="star" size="30" @click="collecte()" />
      <uni-icons type="headphones" size="30" @click="listen()" />
      <uni-icons type="paperplane" size="30" @click="statistics()" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      learnCount: 1000,
      reviewCount: 20,
    };
  },
  onLoad() {},
  methods: {
    gotoUserPage() {
      uni.showToast({
        title: "跳转用户页面",
        icon: "success",
        mask: true,
      });
    },
    study() {
      uni.showToast({
        title: "Learn",
        icon: "success",
        mask: true,
      });
    },
    review() {
      uni.showToast({
        title: "review",
        icon: "success",
        mask: true,
      });
    },
    home() {
      //todo
      uni.showToast({
        title: "home",
        icon: "success",
        mask: true,
      });
    },
    collecte() {
      //todo
	  uni.showToast({
        title: "collecte",
        icon: "success",
        mask: true,
      });
    },
    listen() {
      //todo
	  uni.showToast({
        title: "listen",
        icon: "success",
        mask: true,
      });
    },
    statistics() {
      //todo
	  uni.showToast({
        title: "statistics",
        icon: "success",
        mask: true,
      });
    },
  },
};
</script>

<style>
.content {
  background: #63639c;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.userIconView {
  /* display: flex;
	align-items: left;
	justify-content: left; */
  align-self: start;
}

.userIcon {
  width: 120rpx;
  height: 120rpx;
  border-radius: 100px;
}
.buttonView {
  display: flex;
  justify-content: space-around;
  width: 750rpx;
}

.subButtonView1 {
  width: 225rpx;
  height: 120rpx;
  border-radius: 50%;
  color: rgb(27, 23, 23);
  /* opacity: 0.3; */
}

.subButtonView1_1 {
  display: flex;
  flex-direction: column;
}

.subButtonView2 {
  border-radius: 100px;
  /* opacity: 0.3;
  filter: blur(20px); */
}
.perWord {
  font-size: 40rpx;
}
.BurronText {
  font-size: 28rpx;
  color: rgb(58, 57, 57);
  width: 120rpx;
}
.BurronTextCount {
  font-size: 26rpx;
  color: rgb(233, 197, 37);
}

.buttonIcon {
  display: flex;
  justify-content: space-around;
  width: 750rpx;
  color: rgb(255, 251, 246);
}
</style>
