    var oHead = document.getElementsByTagName('head')[0];

    var includeFile = ["megapix-image.js","hammer.min.js","iscroll-zoom-min.js","lrz.all.bundle.js","PhotoClip.js"];

    for (var i = 0; i < includeFile.length; i++) {
        var oScript = document.createElement("script");

        oScript.setAttribute("type", "text/javascript");

        oScript.setAttribute("src", "js/" + includeFile[i]);

        oHead.appendChild(oScript);
    }

    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) { 
        alert("程序加载出错，请尝试重新刷新页面！");
   } 

    function picProcessing(data) {
        console.log(data);
        this.id = data.id;
        this.callback = data.fun;
        if (data.isClip != undefined && data.isClip != "") {
            this.setting = data.isClip;
            this.clip(this.setting);
        }else{
            this.picCompress();
        }
    }

    picProcessing.prototype.picCompress = function() {
        var _this = this;
        document.getElementById(this.id).onchange = function() {
            var file = this.files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            var userWidth = document.body.offsetWidth;
            var userHeight = document.body.offsetHeight;
            fileReader.onload = function() {
                var IMG = new Image();
                IMG.src = this.result;
                IMG.onload = function() {
                    var w = this.width,
                        h = this.height,
                        resizeW = 0,
                        resizeH = 0;
                    var maxSize = {
                        width: userWidth,
                        height: userHeight,
                        level: 0.8
                    };
                    if (w > maxSize.width || h > maxSize.height) {
                        resizeW = userWidth;
                        resizeH = userHeight;
                    } else {
                        eval(_this.callback + "(IMG.src)");
                        return false;
                    }
                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d');
                    if (window.navigator.userAgent.indexOf('iPhone') > 0) {
                        var mpImg = new MegaPixImage(file);
                        var resultImage = document.createElement("img");
                        resultImage.id = "resultImage";
                        var resImg = document.getElementById('resultImage');
                        mpImg.render(resImg, { maxWidth: 300, maxHeight: 300, orientation: 6, quality: 1 });
                        setTimeout(function() {
                            var ios64 = resImg.src;
                            eval(_this.callback + "(ios64)");
                        }, 1000)
                        return false;
                    } else {
                        canvas.width = resizeW;
                        canvas.height = resizeH;
                        ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
                    }
                    var base64 = canvas.toDataURL(file.type, maxSize.level);
                    eval(_this.callback + "(base64)");
                }
            };
        }
    }

    picProcessing.prototype.clip = function(setting) {
        var _this = this;
        var pc = new PhotoClip(setting.container, {
            size: setting.options.size,
            outputSize: setting.options.outputSize,
            file: "#" + this.id,
            view: setting.options.res,
            ok: setting.options.clip,
            loadStart: function() {
                console.log('Load Img');
            },
            loadComplete: function() {
                console.log('Img Onload');
            },
            done: function(dataURL) {
                eval(_this.callback + "(dataURL)");
            },
            fail: function(msg) {
                alert(msg);
            }
        });
    }