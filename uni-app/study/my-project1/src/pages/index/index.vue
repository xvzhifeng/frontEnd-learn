<template >
  <view class="content" :style="{ height: appHeight + 'rpx' }">
    <image class="image-bg" :src="backgroundUrl" />
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

    <view class="buttonView" >
      <view classs="subButtonView1">
        <button :disabled="false" :loading="false" @click="study()" plain="true" class="button">
          <view class="subButtonView1_1">
            <text class="BurronText">Learn</text>
            <text class="BurronTextCount">{{ learnCount }}</text>
          </view>
          
        </button>
      </view>

      <view classs="subButtonView2" >
        <button
          :disabled="false"
          :loading="false"
          @click="review()"
          plain="true"
          class="button"
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
      appHeight: 0,
      backgroundUrl: "/static/temp/index.jpg",
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        console.log("手机可用高度:" + res.windowHeight * 2 + "rpx");
        this.appHeight = res.windowHeight * 2;
      },
    });
  },

  methods: {
    gotoUserPage() {
      uni.showToast({
        title: "跳转用户页面",
        icon: "success",
        mask: true,
      });
      uni.navigateTo({ url: "/pages/index/user" ,
	  success:()=>{
		  console.log("success goto user page");
	  }});
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
.image-bg {
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.content {
  /* background: #63639c; */
  position: relative;
  z-index: 0;
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
  position: absolute;
  left: 0;
  top: 0;
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
  flex-basis: 20upx;
 
  margin: 0 auto;
}
.button{
  padding: 0rpx;
}
.subButtonView1 {
  width: 280rpx;
  height: 120rpx;
  border-radius: 50%;
 display: inline-block;
  /* opacity: 0.3; */
  padding: 0px;
}

.subButtonView1_1 {
  width: 250rpx;
  display: flex;
  flex-direction: column;
  background: rgba(58, 57, 57,0.4);

}

.subButtonView2 {
  border-radius: 100px;
width: 280rpx;
  /* opacity: 0.3;
  filter: blur(20px); */
  display: inline-block;
}
.perWord {
  font-size: 60rpx;
  display: flex;
  flex-basis: 500upx;
  

}
.BurronText {
  font-size: 28rpx;
  color: rgb(58, 57, 57);
  width: 120rpx;
  display: block;
  

}
.BurronTextCount {
  font-size: 28rpx;
  color: rgb(233, 197, 37);
  width: 120rpx;
  line-height: 110%;
}

.buttonIcon {
  display: flex;
  justify-content: space-around;
  width: 750rpx;
  position: absolute;
  bottom: 75rpx;
  color: rgb(255, 251, 246);
}
</style>
