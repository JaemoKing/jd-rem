var CategorySlide = function () {

}

CategorySlide.prototype = {
    //初始化左边
    categoryLeft: function () {
        var swiper1 = new Swiper('#categoryLeft', {
            direction: 'vertical',
            //如果有多个 <!-- 滑动内容的大容器 -->swiper-slide 就需要加这个参数
            slidesPerView: 'auto',
            //开启回弹效果
            freeMode: true,
            //允许鼠标滚轮滚动切换
            mousewheel: true,
        })
    },

    //初始化右边
    categoryRight: function () {
        // 2. 初始化右侧滑动
        var swiper2 = new Swiper('#categoryRight', {
            direction: 'vertical',
            //如果有多个 <!-- 滑动内容的大容器 -->swiper-slide 就需要加这个参数
            slidesPerView: 'auto',
            //开启回弹效果
            freeMode: true,
            // //初始化滚动条  必须子元素的高度超过父元素
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
            //允许鼠标滚轮滚动切换
            mousewheel: true,
        })
    },

    //分类左侧点击效果
    categoryLeftClick: function () {
        //给所有a标签添加点击事件( 给父级元素ul添加点击事件然后通过捕获事件获取到里边的a标签)
        var ul = document.querySelector('.category-left ul');
        //获取所有的li
        var lis = document.querySelectorAll('.category-left ul li');
        //获取category-left里面swiper-wrapper元素
        var swiperWrapper = document.querySelector('.category-left .swiper-wrapper');
        ul.addEventListener('click', function (e) {
            // e.target 捕获事件源   当触发事件是捕获到触发事件的事件源
            //给所有的li清除active 给当前点击的a标签的父元素li添加active
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
                //给每个li添加一个index属性来存数组的下标
                lis[i].index = i;
            }
            //给当前点击的a的父元素添加active
            e.target.parentNode.classList.add('active');

            //让当前点击的a吸到顶部 (移动到最顶部的距离)
            //位移的距离 = 当前点击的a标签的索引 * li的高度 因为是往上移动的所以是负值
            var translateY = - e.target.parentNode.index * e.target.parentNode.offsetHeight;
            // console.log(translateY);

            //因为位移的距离有一个最大值，超过最大值之后就不让容器位移了 所以算出位移距离之后要判断一下是否超出最打位移距离
            //获取swiperWrapper容器的高度
            var swiperWrapperHeight = swiperWrapper.offsetHeight;
            //获取内容容器ul的过度
            var ulHeight = ul.offsetHeight;
            //根据获取的两个高度算出最大位移距离
            var maxTranslateY = swiperWrapperHeight - ulHeight;//因为位移的距离是负数 所以用小数-大数直接得到结果
            //判断
            // if ( translateY < maxTranslateY ){
            //     //如果位移距离小于最大位移距离 那么就让位移距离等于最大位移距离
            //     translateY = maxTranslateY;
            // }
            //只有两个结果可以用三元表达式来判断这样逼格更高 如果 位移距离 < 最大位移距离 那么就让 位移距离 = 最大位移距离
            translateY = translateY < maxTranslateY ? maxTranslateY : translateY;

            //给当前swiper-wrapper容器设置 translate3d位移 注意js生成的样式是行内的 要带单位 px
            swiperWrapper.style.transform = 'translate3d(0,' + translateY + 'px, 0)'
            //给位移的swiper-wrapper容器添加过度效果 
            swiperWrapper.style.transition = 'all .3s';
        })
    },

    //js算html字体大小
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
window.addEventListener('load', function () {
    var categorySlide = new CategorySlide();
    categorySlide.categoryLeft();
    categorySlide.categoryRight();
    categorySlide.categoryLeftClick();
    categorySlide.rem();
})
