<template>
  <view class="content">
    <uni-forms ref="form" :modelValue="formData" :rules="rules" class="form">
      <uni-forms-item
        label="邮箱:"
        name="email"
        required
        label-width="50"
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
          v-model="formData.email"
          placeholder="请输入邮箱"
        />
      </uni-forms-item>
    </uni-forms>
    <view>
      <button @click="submit" class="submit">下一步</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "邮箱登录",
      formData: {
        email: "sumu@email.com",
      },
      rules: {
        email: {
          // email 字段的校验
          rules: [
            // email 字段不能非空
            {
              required: true,
              message: "请输入邮箱",
            },
            {
              // 对邮箱的格式进行验证
              format: "email",
              errorMessage: "请输入正确的邮箱地址",
            },
          ],
        },
      },
    };
  },
  onLoad(options) {
      console.log(options.email);
      if(options.email != undefined){
          this.formData.email = options.email;
      }
  },
  methods: {
    /**
     * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
     * @param {String} name 字段名称
     * @param {String} value 表单域的值
     */
    // binddata(name,value){
    // 通过 input 事件设置表单指定 name 的值
    //   this.$refs.form.setValue(name, value)
    // },
    // 触发提交表单
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
        // 调用发送验证码的接口，返回验证码的内容
          uni.request({
              url:"http://127.0.0.1:1011/login/email/text",
              data:{
                  email:res.email
              },
              success:(res) => {
                  console.log(res.data);
                  uni.navigateTo({ url: `/pages/login/verificationCode?code=${res.data.code}`,success:()=>{
                      console.log("跳转到输入验证码的页面");
                  } })
              }
          })
        // console.log(res.email);
        // uni.navigateTo({
        //     url: `/pages/login/verificationCode?code=123456&email=${res.email}`,
        //     success: () => {
        //       console.log("跳转到输入验证码的页面");
        //     },
        //   });
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
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
</style>