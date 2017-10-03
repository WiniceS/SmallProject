//圖片時鐘
var hour = document.querySelectorAll('.hour');
var minute = document.querySelectorAll('.minute');
var second = document.querySelectorAll('.second');
var timers = document.querySelectorAll('.showtime');

timeRun();

function timeRun() {
    var time = getTime();
    showTime(time,timers);
    setTimeout(function(){
        var lasttime = getTime();   
        for (var i = 0; i < lasttime.length; i++) {
            //创建新的img标签来存放图片
            if (time[i].src != lasttime[i].src) {
                var newTimer = document.createElement('img');
                newTimer.src = `./images/${lasttime[i].src}.png`;
                newTimer.style.cssText = "width:'41';height:'61px';top:61px";
                newTimer.className = 'nexttime';
                time[i].obj.appendChild(newTimer);
                // console.log(time[i].obj)
                //设置动画样式
                var change1 = {
                    time: 1000,
                    obj: time[i].obj.lastChild.previousSibling,
                    css: {
                        "top": '-61px'
                    },
                    //回调函数是将多余的img去除
                    callback:function(){
                            for (var f = 0; f < time.length; f++) {
                                if(time[f].obj.children.length>2)
                                time[f].obj.removeChild(time[f].obj.firstChild);
                            }      
                    }
                }
                var change2 = {
                    time: 1000,
                    obj: time[i].obj.lastChild,
                    css: {
                        "top": 0
                    }
                }
                Animation(change1);
                Animation(change2);
            }
        }
        timeRun();
    },1000)
    
}
//将单位数变成双位数
function toTwo(a) {
    return a = a < 10 ? "0" + a : a;
}
//获取当前时间的字符串数组
function getTime() {
    var date = new Date();
    var tHour = toTwo(date.getHours()).toString();
    var tMinute = toTwo(date.getMinutes()).toString();
    var tSecond = toTwo(date.getSeconds()).toString();
    var timeArr = [];
    timeArr.push({obj:hour[0],src:tHour.slice(0, 1)});
    timeArr.push({obj:hour[1],src:tHour.slice(1, 2)});
    timeArr.push({obj:minute[0],src:tMinute.slice(0, 1)});
    timeArr.push({obj:minute[1],src:tMinute.slice(1, 2)});
    timeArr.push({obj:second[0],src:tSecond.slice(0, 1)});
    timeArr.push({obj:second[1],src:tSecond.slice(1, 2)});
    return timeArr;
}
//显示时间在页面上
function showTime(time,obj) {
    for (var i = 0; i < time.length; i++) {
        obj[i].src = `./images/${time[i].src}.png`;
    }
}

/*
     {
         time:  时间
         obj:   dom对象
         css:   css样式
         callback:回调函数
         delay: 延迟时间
     }
*/

function Animation(option) {
    //必要参数错误提示信息
    if (option.time == undefined) throw 'please import time';
    if (option.obj == undefined) throw 'please import obj';
    if (option.css == undefined) throw 'please import css';
    //设立默认延时时间0
    if (option.delay == undefined) option.delay = 0;
    //创建新旧状态库
    var nowStatus = {};
    var todoStatus = {};
    //循环处理新旧状态库，将状态添加到库中
    for (var key in option.css) {
        nowStatus[key] = parseFloat(getStyle(option.obj, key));
        todoStatus[key] = parseFloat(option.css[key]);
    }
    //设置延迟执行函数
    var timer = setTimeout(function () {
        var init_time = new Date();//获取最新时间

        (function run() {
            var run_t = new Date() - init_time; //获取requestAnimationFrame处理后的时间差
            var prop = run_t / option.time;  //建立比例机制
            if (prop >= 1) prop = 1;
            else window.requestAnimationFrame(run)
            //循环处理库中的样式改变
            for (var key in option.css) {
                var target = nowStatus[key] + prop * (todoStatus[key] - nowStatus[key]);
                // console.log(target)
                if (ifZandO(key)) {
                    option.obj.style[changestring(key)] = `${target}px`;
                } else {
                    option.obj.style[changestring(key)] = target;
                }
            }
            //如果有回调函数的话，就在完成样式变换后进行回调函数的执行
            if (prop >= 1 && option.callback) return option.callback();
        })();
    }, option.delay)

    function getStyle(obj, attr) { //定义获取样式函数
        return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.currentStyle[attr];
    }
    //将有-的样式字符串改为驼峰字符串
    function changestring(string) {
        if (string.indexOf('-') != -1) {
            var a = string.match(/-[a-z]/g);
            for (var i = 0; i < a.length; i++) {
                a[i] = a[i].replace("-", "");
                a[i] = a[i].toUpperCase();
                string = string.replace(/-[a-z]/, a[i]);
            }
        }
        return string;
    }
    //判断样式是否为z-index和opacity，以便处理是否加px
    function ifZandO(key) {
        var stringKey = key.toString();
        switch (stringKey) {
            case "z-index":
                return false;
                break;
            case "opacity":
                return false;
                break;
            default:
                return true;
                break;
        }
    }
}


