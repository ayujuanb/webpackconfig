var path=require('path');
var webpack=require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 为了抽离css样式

module.exports={
    entry:[ //入口文件配置
       //'webpack/hot/dev-server',
        path.resolve(__dirname,"src/")
    ],

    output:{    //文件导出的配置
        path:path.resolve(__dirname,'build'),
        publicPath:'/',
        filename:'js/bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.(less|css)$/,
                loader:ExtractTextPlugin.extract('css!autoprefixer!less')
            },
            {
                test:/\.(js|jsx)$/, //注意是正则表达式，不要加引号，匹配要处理的文件
                exclude:/(node_modules|bower_components)/, //排除不处理的目录
                loader:"babel", //要使用的loader，"-loader"可以省略
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test:/\.(jpe?g|gif|png|ico|svg)$/,
                loader:'url?limit=1000&name=images/[name].[ext]'
            }
        ]
    },
    plugins:[   //配置插件
        new webpack.HotModuleReplacementPlugin(),   //开启热替换插件
        new webpack.NoErrorsPlugin(),   //报错但不退出webpack进程
        new ExtractTextPlugin('css/app.min.css'),    //将css成生文件，而非内联
        new HtmlWebpackPlugin({
            filename:"index.html",  //生成html存放的路径
            inject:"body",  //允许插件修改哪些内容，包括head与body
            template:"./src/index.html",    //html模版路径
            hash:true,  //为静态资源生成hash值
            //minify:{    //压缩html文件
            //    removeComments:true,   //移除html中的注释
            //    collapseWhitespace:true //删除空白字符与换行符
            //}
        }),
        //压缩打包的文件
        //new webpack.optimize.UglifyJsPlugin({
        //    compressor: {
        //        warnings: false,
        //        screw_ie8: true
        //    }
        //})


    ]
};
