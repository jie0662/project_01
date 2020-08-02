$(function() {
    //定义一个时间过滤器 格式为 年-月-日 时:分:秒
    template.defaults.imports.dateFormat = function(dataStr) {
        //定义一个时间补零函数
        function padZero(n) {
            if (n < 10) {
                return '0' + n
            } else {
                return n
            }
        }
        var dt = new Date(dataStr);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
        //过滤器最后一定要有return输出值
    }


    //定义获取新闻列表函数
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function(res) {
            if (res.status !== 200) {
                return alert('获取新闻列表失败')
            }

            for (var i = 0; i < res.data.length; i++) {
                //将res里的tags属性变为数组;
                res.data[i].tags = res.data[i].tags.split(',');
            }
            //添加变量获取调用template模板数据
            var html = template('tpl-news', res);
            // 渲染页面
            $('#news-list').html(html);
            console.log(res);
        })
    }
    getNewsList()

})