const path=require("path"),
      webpack=require("webpack"),
      HtmlWebpackPlugin=require("html-webpack-plugin"),
      CopyPlugin = require("copy-webpack-plugin");


module.exports=function(env,argv){
    const IS_DEV=argv.mode === 'development';  //开发环境

    var config={
          entry:"./src/main.ts",
          output:{
              path:path.resolve(__dirname,"dist"),
              filename:"js/[name].[hash:6].js"
          },
          module:{
              rules:[
                  {
                    test:/\.ts$/,
                    exclude: /node_modules/,
                    use:"ts-loader" 
                  }
              ]
          },
          resolve:{
              extensions:['.ts', '.js', '.json']
          },
          plugins:[
            new webpack.DefinePlugin({
                "$IS_DEV":JSON.stringify(IS_DEV)   //是否是开发环境
            }),
              new HtmlWebpackPlugin({
                  template:"src/index.html",
                  inject:"body",
              }),
              new CopyPlugin({
                patterns: [
                  { from: "statics", to: "./statics" },
                  {from: "src/.manifest",to: "./.manifest"}
                ],
              }),
          ],
          devServer:{
              contentBase:"./dist",
              inline:true,
              open:true
          }
    };

    return config;
};