<template >
  <view class="content">
    <view class="title1">
      <text class="font1">不</text>
    </view>
    <view class="title2">
      <text class="font2">背</text>
    </view>
    <view class="title3">
      <text class="font3">真实语境学单词</text>
    </view>

    <!-- 底部布局 -->
    <view class="bottom">
      <view class="emailButton">
        <button
          class="email"
          :disabled="false"
          :loading="false"
          hover-class="button-hover"
          @click="register()"
        >
          邮箱一键登录
        </button>
      </view>

      <view class="subButton">
        <button class="subButton1" :disabled="true" @click="todo()">
          <uni-icons type="chatboxes-filled" size="25"></uni-icons>
        </button>
        <button class="subButton1" :disabled="true" @click="todo()">
          <uni-icons type="email" size="25"></uni-icons>
        </button>
        <button class="subButton1" :disabled="true" @click="todo()">
          <uni-icons type="more" size="25"></uni-icons>
        </button>
      </view>

      <view class="option">
        <checkbox-group @change="checkboxChange">
          <label class="checkboxs">
            <checkbox
              :value="isRead"
              :checked="false"
              color="rgb(250, 166, 96)"
              style="transform: scale(0.7)"
            />&nbsp;&nbsp;
            我已成功阅读并同意《隐私协议》《服务条款》和《儿童信息保护》
          </label>
        </checkbox-group>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      isRead: "isRead",
      pitchOn: false,
    };
  },
  onLoad() {},
  methods: {
    register() {
      if (!this.pitchOn) {
        alert("请先阅读相关条例");
        return;
      } else {
        uni.redirectTo({
            url:"/pages/login/email",
            successs: () => {
                console.log("跳转到邮箱输入页面成功");
            },
            fail: () => {
                console.log("跳转邮箱输入页面失败");
            }
        })
        console.log("注册");
      }
    },
    checkboxChange(e) {
        console.log(...e.detail.value)
        let [temp] = [...e.detail.value] 
        this.pitchOn = temp === 'isRead';
    },
  },
};
</script>

<style>
.content {
  background-color: rgb(58, 57, 57);
  background-size: 100% 100%;
  width: 100%;
  height: 800px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  /* justify-items: center; */
  /* color: rgb(59, 58, 58); */
}
.title1 {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: rgb(58, 57, 57);
  /* padding: 20px; */
  border: 2px solid rgb(250, 166, 96);
  width: 70px;
  height: 70px;
  margin: 10px;
}
.title2 {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: rgb(250, 166, 96);
  /* padding: 20px; */
  width: 70px;
  height: 70px;
  margin: 10px;
}

.title3 {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  /* background: rgb(250, 166, 96); */
  /* padding: 20px; */
  width: 400px;
  height: 40px;
  margin: 10px;
}

.font1 {
  color: rgb(250, 166, 96);
  font-size: 40px;
}

.font2 {
  color: #313131;
  font-size: 40px;
}

.font3 {
  color: #ffffff;
  font-size: 20px;
}

.font4 {
  color: #ffffff;
  font-size: 20px;
  margin: 10px;
}

.bottom {
  flex-direction: column;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 400px;
}

.subButton {
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* align-items: center; */
  /* align-self: end; */
}

.subButton1 {
  /* align-self: flex-end; */
  height: 50px;
  width: 50px;
  border-radius: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.email {
  width: 200px;
  height: 50px;
  margin: 10px;
  background-color: rgb(242, 245, 53);
}

.option {
  margin: 20px;
  width: 300px;
  height: 50px;
  font-size: 10px;
}

.checkboxs {
  height: 40px;
  color: rgb(242, 245, 53);
}
</style>
