<template>
  <view class="content">
    <!-- 倒计时 -->
    <view class="countDown">
      <text>验证码有效期：</text>
      <uni-countdown
        :font-size="15"
        :show-day="false"
        :second="timeupSecond"
        @timeup="timeup"
      />
    </view>

    <uni-forms ref="form" :modelValue="formData" :rules="rules" class="form">
      <uni-forms-item
        label="验证码:"
        name="code"
        required
        label-width="80"
        label-align="center"
      >
        <!-- <input
          class="input"
          v-model="formData.email"
          type="text"
          placeholder="请输入邮箱"
          @input="binddata('email', $event.detail.value)"
        /> -->
        <uni-easyinput
          type="text"
          v-model="formData.code"
          placeholder="请输入验证码"
        />
      </uni-forms-item>
    </uni-forms>
    <view>
      <button @click="submit" class="submit">登录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      timeupSecond: 60,
      resCode: "",
      email: "",
      formData: {
        
      },
      rules: {
        code: {
          // code 字段的校验
          rules: [
            // code 字段不能非空
            {
              required: true,
              message: "请输入验证码",
            },
            {
              /**
               * validateFunction 自定义校验规则使用说明
               * uni-forms 的 rules 基础规则有时候不能满足项目的所有使用场景，这时候可以使用 validateFunction 来自定义校验规则
               * validateFunction 方法返回四个参数 validateFunction:function(rule,value,data,callback){} ，当然返回参数名开发者可以自定义：
               * rule : 当前校验字段在 rules 中所对应的校验规则
               * value : 当前校验字段的值
               * data : 所有校验字段的字段和值的对象
               * callback : 校验完成时的回调，一般无需执行callback，返回true(校验通过)或者false(校验失败)即可 ，如果需要显示不同的 errMessage，如果校验不通过需要执行 callback('提示错误信息')，如果校验通过，执行callback()即可
               */
              validateFunction: (rule, value, data, callback) => {
                console.log(this.resCode);
                if (value === this.resCode) {
                  return true;
                }
                callback("验证码输入错误");
              },
            },
          ],
        },
      },
    };
  },
  onLoad(options) {
    this.resCode = options.code;
    this.email = options.email;
  },
  onReady() {
        // 需要在onReady中设置规则
        this.$refs.form.setRules(this.rules)
    },
  methods: {
    // 触发提交表单
    submit() {
      this.$refs.form.setRules(this.rules);
      this.$refs.form
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
          // 调用发送验证码的接口，返回验证码的内容
          //   uni.request({
          //       url:"https://sumu.today.com",
          //       data:{
          //           email:res.email
          //       },
          //       success:(res) => {
          //           console.log(res.data);
          //           uni.navigateTo({ url: `/pages/login/verificationCode?code=${res.data.code}`,success:()=>{
          //               console.log("跳转到输入验证码的页面");
          //           } })
          //       }
          //   })
          if (res.code === this.resCode) {
            // alert("注册成功");
              console.log("注册成功");
              uni.redirectTo({
              url: `/pages/index/index?email=${this.email}`,
              success: () => {
                console.log("跳转到主页");
              },
            });
          } else {
            console.log("验证码错误");
          }
            
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },
    timeup() {
      // alert("验证码过期,请重新发送验证码");
      uni.redirectTo({
        url: `/pages/login/email?email=${this.email}`,
        success: () => {
          console.log("跳转到发送验证码的页面");
        },
      });
    },
  },
};
</script>

<style>
.content {
  /* background-color: rgb(58, 57, 57); */
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

.form {
  width: 300px;
  height: 50px;
  color: rgb(22, 151, 151);
  font-size: 30px;
}

.submit {
  width: 200px;
  height: 40px;
  margin: 10px;
  background-color: rgb(156, 166, 187);
  font-size: 15px;
}

.countDown {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1200px;
    font-size: 18px;
    margin: 20px;
    color:rgb(146, 146, 146)
}
</style>
