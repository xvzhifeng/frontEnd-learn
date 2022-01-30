<template>
  <view class="content" :style="{ height: app_height + 'rpx' }">
    <view class="userIconView">
      <cover-image
        :src="userImageUrl"
        class="userIcon"
        @click="gotoUserInfo()"
      ></cover-image>
      <view class="usernameView">
        <text>{{ username }}</text>
      </view>
    </view>
    <view class="grid">
      <view class="gridUpRow">
        <view class="subGrid">
          <uni-icons type="chat" color="#52CC6F" size="50" @click="message()"/>
          <text>我的消息</text>
        </view>

        <view class="subGrid">
          <uni-icons type="camera" color="#C465E2" size="50" @click="camera()"/>
          <text>我的装备</text>
        </view>
      </view>
      <view class="gridDownRow">
        <view class="subGrid">
          <uni-icons type="gift" color="#FEEDA6" size="50" @click="gift()"/>
          <text>我的酷币</text>
        </view>
        <view class="subGrid">
          <uni-icons type="color" color="#FF7272" size="50" @click="color()"/>
          <text>我的喜欢</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: "用户名",
      app_height: 0,
      userImageUrl:"/static/logo.png"
    };
  },
  onLoad(options) {
    uni.getSystemInfo({
      success: (result) => {
        this.app_height = result.windowHeight * 2;
      },
      fail: (error) => {
        console.log(`user: ${error}`);
      },
    });
  },
  methods: {
    gotoUserInfo(){
      //todo
      uni.showToast({
        title: "gotoUserInfo",
        icon: "success",
        mask: true,
      });
    },
    message(){
      //todo
      uni.showToast({
        title: "message",
        icon: "success",
        mask: true,
      });
    },
    camera(){
      //todo
      uni.showToast({
        title: "camera",
        icon: "success",
        mask: true,
      });
    },
    gift(){
      //todo
      uni.showToast({
        title: "gift",
        icon: "success",
        mask: true,
      });
    },
    color(){
      //todo
      uni.showToast({
        title: "color",
        icon: "success",
        mask: true,
      });
    }
  },
};
</script>

<style>
.content {
  background: linear-gradient(to top, rgba(65, 63, 63, 0), rgb(5, 110, 136));
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.userIconView {
  display: flex;
  flex-direction: column;
	align-items: center;
	justify-content: center;
}

.userIcon {
  width: 260rpx;
  height: 260rpx;
  border-radius: 100px;
}

.usernameView {
  margin: 20rpx;
}

.grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gridUpRow {
  display: flex;
  justify-content: space-evenly;
  width: 750rpx;
}

.gridDownRow {
  display: flex;
  justify-content: space-evenly;
  width: 750rpx;
}

.subGrid {
  width: 280rpx;
  height: 280rpx;
  border-radius:20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20rpx;
  background: rgba(52,64,106,0.8);
  box-shadow: 2px 2px 2px #000000;
}

text{
  color: rgb(255, 255, 255);
}
</style>
