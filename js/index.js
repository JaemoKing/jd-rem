
//创建一个构造函数 存储一些京东效果对象 使用面向对象的方式减少全局变量的使用
var JDEffect = function () {

}

//JDEffect的原型对象，效果都放在原型中
JDEffect.prototype = {
    //导航渐变效果
    headerGradient: function () {
        //获取导航
        var header = document.querySelector('#header');

        //获取轮播图容器高度
        var slideHeight = document.querySelector('#slide').offsetHeight;

        //调用一下计算背景色函数 给头部添加背景颜色,可以解决页面刷新时没有背景色的问题
        scroll();

        //监听滚动条滚动 滚动条监听事件
        // window.scroll = function (){}
        window.addEventListener('scroll', scroll);//触发事件时调用函数计算背景色

        //把计算背景色的代码封装到函数中，这样可以解决刷新页面时没有背景色的问题
        function scroll() {
            //获取滚动条距离顶部的距离  调用获取滚动条距离顶部的距离函数时时获取到滚动条距离顶部的距离
            //document.documentElement.scrollTop 这个写法也可以但是这个写法对于别的低版本浏览器很不友好，这个写法兼容高版本谷歌
            var scrollTop = getScrollTop();

            //计算透明度值 滚动的距离 / 轮播图容器的高度
            var opcity = scrollTop / slideHeight;

            //判断透明度值是否 >0.8 ，如果?0.8 就让透明度等于0.8， 否则就透明度值就等于计算出来的透明度值
            var opcity = opcity > 0.8 ? 0.8 : opcity;
            // if ( opcity > 0.8 ){
            //     opcity = 0.8;
            // }
            //设置导航透明度
            header.style.backgroundColor = 'rgba(222,24,27,' + opcity + ')';
        }

        //获取滚动条滚动的距离 也就是滚动条距离顶部的距离  这部分代码是百度的
        function getScrollTop() {
            var scrollPos;
            if (window.pageYOffset) {
                scrollPos = window.pageYOffset;
            } else if (document.compatMode && document.compatMode != 'BackCompat') {
                scrollPos = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollPos = document.body.scrollTop;
            }
            return scrollPos;
        }
    },

    //js倒计时效果
    downTime: function () {
        //获取目标时间总秒数
        var futureTime = new Date(2018, 6, 21, 21, 21, 00);
        // console.log(futureTime);
        //获取当前时间
        var nowTime = new Date();
        // console.log(nowTime);
        //目标时间减去当前时间=倒计时时间  算出的时间是毫毛 所以在 除以1000 得到秒数 ，在向下取整
        var time = Math.floor((futureTime - nowTime) / 1000);
        // console.log(time);

        //获取所有放时间的span标签
        var spans = document.querySelectorAll('.secklill-time span');

        //设置定时器，每过一秒就执行一次,调用倒计时函数一秒执行一次
        setInterval(setCountdownn, 1000);

        //js加载就调用一次设置倒计时函数，避免出现网络延时加载过慢时页面上没有倒计时时间
        setCountdownn();
        //把倒计时效果放在函数中
        function setCountdownn() {

            //倒计时总时间每秒减一
            time--;

            //判断 如果倒计时总时间 < 0  时重置倒计时时间或者清除倒计时
            if (time < 0) {
                time = 7200;//这里是模拟时间，真正的时间是从后台获取到的
            }

            //算出倒计时总时间有多少个小时
            var hour = Math.floor(time / 3600);//一小时有3600s 算出倒计时总共有多少小时

            //算出倒计时减去小时后剩余的分钟
            var minute = Math.floor(time % 3600 / 60);//算出小时后剩余的秒数就是分，除以60s 得到具体有多少分钟

            //算出倒计时减去 时 分 之后的秒数
            var second = Math.floor(time % 60);//算出 时 分后剩下的就是秒数3600是60的倍数 所以 time % 3600 % 60 可以直接写成 tmie % 60
            // console.log( hour,minute,second);

            //分别把 时 分 秒 的 个位和十位的数字放在对应的span中 因为两位数是十进制的所以用时分秒分别除以10获得对应的十位上的数
            // 时 
            spans[0].innerHTML = Math.floor(hour / 10);
            spans[1].innerHTML = Math.floor(hour % 10);
            //分
            spans[3].innerHTML = Math.floor(minute / 10);
            spans[4].innerHTML = Math.floor(minute % 10);
            //秒
            spans[6].innerHTML = Math.floor(second / 10);
            spans[7].innerHTML = Math.floor(second % 10);

        }
    },

    //轮播图效果 
    slide: function () {
        //实例化轮播效果
        var mySwiper = new Swiper('.swiper-container', {
            // 控制轮播图滚动的方向 horizontal水平 vertical 垂直
            direction: 'horizontal',
            //循环轮播
            loop: true,
            //控制轮播图动画切换的速度  轮播图动画的时间
            speed: 300,
            //添加一个小手
            grabCursor: true,
            //自动轮播
            autoplay: {
                //自动轮播间隔时间
                delay: 1000,
                //到最后一张停止自动轮播图 加了loop之后就失效
                stopOnLastSlide: false,
                // 是否要当触摸的时候禁止自动轮播图  ture就禁止 false不禁止
                disableOnInteraction: false,
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 添加回弹效果  为false可以回弹  true 不可以回弹
            freeMode: false,
        })
    },
    rem: function () {
        // 1. 使用JS来获取屏幕的宽度来计算设置当前屏幕需要设置的html字体大小
        // 当前html的字体是页面宽度的1/10  
        // html字体大小 = 屏幕宽度/10

        //把计算html字体大小封装在函数中 然后在window.onresize 事件中调用计算htm字体大小的函数 根据屏幕大小的变化时时计算出html的字体大小
        //页面加载就调用计算html字体大小的函数 来算出当前页面的html字体大小 来适配页面
        setHtmlFontSize();
        function setHtmlFontSize() {
            var windowWidth = document.body.offsetWidth;
            var htmlFontSize = windowWidth / 10;
            //获取html设置当前计算的字体大小 带单位
            document.querySelector('html').style.fontSize = htmlFontSize + 'px';
        }
        window.addEventListener('resize', setHtmlFontSize);
    }
}
//入口函数
window.addEventListener('load', function () {
    //构造函数实例化出对象
    var jdEffect = new JDEffect();
    //实例化对象调用构造函数原型中的方法
    jdEffect.headerGradient();
    jdEffect.downTime();
    jdEffect.slide();
    jdEffect.rem();
});

