<script>
// 引入 page-animation 组件
import pageAnimation from "./components/page-animation-pro";

export default {
  mixins: [pageAnimation],
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
//配置页面参数
export const pageIndexSetting = [
    {path:'pages/content/index',animaName:'slide-in-bottom',pageIn:false,pageOut:false},
    // {path:'',animaName:'',pageIn:,pageOut:},
]
</script>

<style>
/*每个页面公共css */
</style>
