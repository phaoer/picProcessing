# xy_image_optimu.js v1.0.0
迅游移动端图像处理套件，**高度集成的一个移动端图像处理插件！         迅游版权所有       Create By Pwh**

- 基于Canvas
- 图像压缩功能，兼容Ios,Android
- 图像自由裁剪功能，兼容各手机主流浏览器

## 依赖

依赖文件两个，但是！！！！！！
现在流行傻瓜式操作，朕帮你们集成了~~~

## 使用方法

#### 引入

```html
<script type="text/javascript" src="/js/xy_image_optimu.js"></script>
<script type="text/javascript">
window.onload = function(){
    var data = {
        id:"#a",  // 上传图片input id
        fun:"fun",      // 回调函数
        isClip:{       // 需要进行裁剪才传入，不需要裁剪理都不要理他！！！
              container:"#b",  // 用户上传图片展示容器
              options:{
                size: 260,           // 裁剪框大小
                outputSize:100,      // 裁剪后图像输出大小
                res: '#c',           // 裁剪后图像展示容器
                clip: '#d'           // 裁剪按钮id
              }
          }
        }
    var pic = new picProcessing(data);  //实例化插件，传入图片上传按钮id，和一些配置项
}
</script>
```

### The Relentless Pursuit of Perfection    持续更新中