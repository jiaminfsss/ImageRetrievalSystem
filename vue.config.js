const { defineConfig } = require('@vue/cli-service')



module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: '127.0.0.1',
    port: 8080, //vue项目端口
    open: true,// vue项目启动时自动打开浏览器
    proxy: {
      '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
        target: "http://127.0.0.1:2020", //目标地址，一般是指后台服务器地址
        changeOrigin: true, //是否跨域
        pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
          '^/api': ""
        }
      }
    }
  }
})

// const { defineConfig } = require('@vue/cli-service')
//         //用户信息表

// module.exports = defineConfig({
//   // configureWebpack: {
//   //   devServer: {
//   //     //mock接口
//   //     //每次更改mock配置必须重启项目 坑！！！！
//   //     setupMiddlewares:(middlewares, devServer)=>{
//   //       if(!devServer) {
//   //         throw new Error('devserver is not defined')
//   //       }
//   //       devServer.app.get('/api/login',(_,res)=>{
//   //         // const {username,password}=res.query
//   //         let username = res.params.username
//   //         let password = res.params.password
//   //         if((username == 'fsjm' && password == '123456') || (username == 'dyb' && password == '123456')) {
//   //           res.send({
//   //             code:0,
//   //             message:'登录成功',
//   //             token:'token'+'-'+username+'-'+ (new Date().getTime() + 60*60*1000)
//   //           })
//   //         }else{
//   //           res.send({
//   //             code:1,
//   //             message:'账号或密码错误'
//   //           })
//   //         }
//   //       })
//   //     }

//   //   }
//   // },
//   transpileDependencies: true
// })



// module.exports = {
//   configureWebpack:{
//     devServer:{
//       before(app){
//         //模拟登录接口
//         app.get('/api/login',(req,res)=>{
//           const {username,password}=res.query
//           if((username == 'fsjm' && password == '123456') || (username == 'dyb' && password == '123456')) {
//             res.json({
//               code:0,
//               message:'登录成功',
//               token:'token'+'-'+username+'-'+ (new Date().getTime() + 60*60*1000)
//             })
//           }else{
//             res.json({
//               code:1,
//               message:'账号或密码错误'
//             })
//           }
//         })
//       }
//     }
//   }
// }