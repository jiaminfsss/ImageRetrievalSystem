const { defineConfig } = require('@vue/cli-service')



module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   onAfterSetupMiddleware: function (devServer) {
  //     if (!devServer) {
  //       throw new Error("webpack-dev-server is not defined");
  //     }
  //     devServer.app.get("/play/p", function (req, res) {
  //       res.json({ code:1000,msg:"成功" });
  //     });
  //     devServer.app.get("/api/login", function (req, res) {
  //       res.json({ code:1000,msg:"成功" });
  //     });
  //   },
  //   onBeforeSetupMiddleware: function (devServer) {
  //     if (!devServer) {
  //       throw new Error("webpack-dev-server is not defined");
  //     }
  //     devServer.app.get("/play/y", function (req, res) {
  //       res.json({code:2000,msg:"错误"})
  //     });
  //     devServer.app.get("/play/p", function (req, res) {
  //       res.json({ code:1000,msg:"成功" });
  //     });
  //   }
  // },
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