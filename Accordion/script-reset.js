//重构函数
function Accordion(obj, option) {
    if (obj == undefined) throw "Please enter the object ";
    if (option.width == undefined) throw "Please enter the width ";
    if (option.height == undefined) throw "Please enter the height ";
    if (option.width * option.height != obj.children.length) throw "width and height not match children length";

    var settingOption = {
        defaultWidth: 150,
        defaultHeight: 50,
        activeWidth: 350,
        activeHeight: 450,
        animatDuration: 300,
    };

    option = Object.assign({}, settingOption, option);
    //自执行初始化函数
    (function init() {
        //将每个对象赋予indexX和indexY坐标
        for (var i = 0; i < obj.children.length; i++) {
            obj.children[i].indexX = i % option.width;
            obj.children[i].indexY = Math.floor(i / option.width);
            obj.children[i].style.cssText = `width:${option.defaultWidth}px;height:${option.defaultHeight}px;`;
        }
        //初始化总盒子的宽高
        obj.style.width = (option.width - 1) * option.defaultWidth + option.activeWidth + "px";
        obj.style.height = (option.height - 1) * option.defaultHeight + option.activeHeight + "px";
        changeDiv(obj.children[0]);
    })();
    //设置缓冲参数
    var buffer = true;
    var otherp;
    //事件委托
    obj.addEventListener('mouseover', function (e) {
        var target = e.target;
        // console.log(target);
        if (target.nodeName === "IMG" && buffer) {
            //循环处理每一个对象的宽高
            changeDiv(target.parentNode);
            var childen=target.parentNode.children; 
            // console.log(otherp);
            if(otherp){
                otherp.style.cssText=`transform: translate(-50%,70%);transition: all ${option.animatDuration}ms;`;
                otherp=undefined;
            }
            // console.log(childen)
            if(Array.prototype.some.call(childen,function(o){return o.nodeName=="P"})){
                Array.prototype.forEach.call(childen,function(o){
                    if(o.nodeName=="P"){
                        o.style.cssText=`transform: translate(-50%,-30%);transition: all ${option.animatDuration}ms;`;
                        otherp=o;
                    }
                })
            }
            //设立缓冲区
            if (buffer) setTimeout(function () {
                buffer = true;
            }, option.animatDuration)
            buffer = false;
        }
    }, false)

    function changeDiv(aObj) {
        for (var i = 0; i < obj.children.length; i++) {
            obj.children[i].style.cssText=`transition: all ${option.animatDuration}ms;`;
            obj.children[i].indexX == aObj.indexX ? obj.children[i].style.width = option.activeWidth + 'px' : obj.children[i].style.width = option.defaultWidth + 'px';
            obj.children[i].indexY == aObj.indexY ? obj.children[i].style.height = option.activeHeight + 'px' : obj.children[i].style.height = option.defaultHeight + 'px';
        }
    }
}