<template>
    <div class="login_container">
        <div class="login_box">
            <div class="login_title">
                用户登录
            </div>
            <!-- 显示表单 -->
            <el-form ref="loginFormRef" label-width="0px" :model="loginForm" :rules="loginFormRules" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="warning" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookies'


export default {
    data(){
        return {
            loginForm: {
                username:'请输入用户名',
                password:'请输入密码'
            },
            loginFormRules: {
                username: [
                    {required:true, message:'请输入用户名', trigger:'blur'},
                    {min:3, max:18, message:'长度在3到18个字符', trigger:'blur'}
                ],
                password: [
                    {required:true, message:'请输入密码', trigger:'blur'},
                    {min:3, max:18, message:'长度在3到18个字符', trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        // 重置表单
        resetLoginForm(){
            console.log("重置表单");
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            console.log("登录");
            console.log(this)
            // 登录参数校验
            this.$refs.loginFormRef.validate(valid => {
                console.log(valid);
                if (!valid) return
                // this.$http.post('http://localhost:2020/login', this.loginForm)
                const formData = new FormData();
                formData.append('username', this.loginForm.username)
                formData.append('password', this.loginForm.password)
                console.log(this.loginForm)
                this.$http.post('/login',formData).then(res =>{
                    if (res.data=='登陆成功'){
                        this.$message.success("登陆成功！");
                        const uid = Cookies.getItem('uid')
                        const urole = Cookies.getItem('urole');
                        const username = Cookies.getItem('username');
                        const gid_list = Cookies.getItem('gid_list'); //返回一个gid列表
                        //把上面几项信息构造成一个对象
                        const userInfo = {
                            uid: uid,
                            urole: urole,
                            username: username,
                            gid_list: gid_list
                        }
                        // 提交mutation来更新userInfo
                        this.$store.commit('setUserInfo', userInfo);
                        //提交mutation保存登录状态
                        this.$store.commit('setLogin', true);
                        // 跳转项目主页
                        this.$router.push('/home');
                    }
                    else this.$message.error("登录失败！")
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: rgb(33, 34, 36);
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: rgb(217, 224, 226);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);

    .login_title {
        align-items: center;
        padding: 35px;
        position : absolute;
        left : 50%;
        transform: translate(-50%, 10%);
        font-size: 22px;
    }

    .login_form {
        position: absolute;
        bottom: 20px;
        width : 100%;
        box-sizing: border-box;
        padding: 0 30px;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
}
</style>