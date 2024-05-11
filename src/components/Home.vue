<template>
    <el-container>
        <!-- 头部区域 -->
        <el-header>
            <div>
                <span>多模式图像检索系统</span>
            </div>
            <el-button @click="logout">退出</el-button>
        </el-header>
        <!-- 主体页面 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                    <!-- 
                        router : 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
                     -->
                    <el-menu-item index="/welcome">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <!-- 一级菜单 -->
                    <el-submenu index="1">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 一级菜单图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 一级菜单文本 -->
                            <span>图像检索</span>
                        </template>
                        <!-- 
                            二级菜单
                            启用该模式会在激活导航时以 index 作为 path 进行路由跳转
                         -->
                        <!-- 草图搜图 -->
                        <el-menu-item index="/sketchRetrieval">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">草图搜图</span>    
                            </template>
                        </el-menu-item>
                        <!-- 图像搜图 -->
                        <el-menu-item index="/imageRetrieval">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">图像搜图</span>    
                            </template>
                        </el-menu-item>
                        <!-- 文字搜图 -->
                        <el-menu-item index="/textRetrieval">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">文字搜图</span>    
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 组群管理 -->
                    <el-menu-item index="/group">
                        <i class="el-icon-menu"></i>
                        <span slot="title">组群管理</span>
                    </el-menu-item>
                    <!-- 图像管理 -->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <!-- 一级菜单文本 -->
                            <span>图像管理</span>
                        </template>
                        <el-menu-item index="/privateGallery">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">私人图库</span>    
                            </template>
                        </el-menu-item>
                        <!-- 图像搜图 -->
                        <el-menu-item index="/groupGallery">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">群组图库</span>    
                            </template>
                        </el-menu-item>
                        <!-- 文字搜图 -->
                        <el-menu-item index="/publicGallery">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">公共图库</span>    
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 历史信息 -->
                    <el-menu-item index="7">
                        <i class="el-icon-setting"></i>
                        <span slot="title">历史信息</span>
                    </el-menu-item>
                </el-menu>

            </el-aside>

            <!-- 内容区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

</script>
<style lang="less" scoped>
.el-header {
    background-color: rgb(41, 40, 40);
    color: aliceblue;
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    align-items: center;
    > div {
        display: flex;
        align-items: center;
    }
}

.el-aside {
    background-color: #545c64;
    color: aliceblue;
}

.el-main {
    background-color: aliceblue;
}

.el-container {
    height:100%;
}
</style>