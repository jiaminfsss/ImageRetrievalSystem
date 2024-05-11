<!-- 整合注意事项 -->
<!-- 目前图像渲染仅与data中全局属性imageUrls绑定， refreshPublicGallery方法通过修改imageUrls的方式实现内容加载-->
<!-- TODO 现有瀑布流不完善，待草图搜索中瀑布流完善后统一修改-->
<!-- TODO 现有查看图片详细信息的功能尚未实现（不会使用对话框），而删除图像依赖于查看图片详细信息的功能 -->

<template>
    <div class="container">
        <div class="title-container">
            <h2 class="public-Gallery-title" style="text-align: center;">公共图库</h2>
            <el-button type="info">跳转检索</el-button>
        </div>
        <!-- 中部分：四个水平排列的组件 -->
        <div class="middle">
            <el-row>
                <el-col :span="6"><el-button type="info" disabled>图像路径</el-button></el-col>
            </el-row>
            <el-row>
                <el-col :span="24" ><el-input class="lbl_path" placeholder="请输入内容" v-model="uploadImgPath"
                        :disabled="true"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col><el-upload class="upload-demo" :show-file-list="true" :file-list="fileList" ref="upload"
                        :auto-upload="false" :on-change="handleFileChange" multiple :limit="1">
                        <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success"
                            @click="upload_img">上传图像</el-button>
                        <div slot="tip" class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2M;目前只支持一次上传一张图片。</div>
                    </el-upload></el-col>
            </el-row>
        </div>
        <div id="app">
            <ul>
                <li ref='waterfallItem' v-for="(item, index) in imageUrls" :key="index">
                    <img :src="item" @click="dialogVisible = true"> 第{{ index + 1 }}张  
                    <!-- TODO 如何确定点击的位置的图片序号，若可以确认则可以通过直接修改detailDialogImg中的属性展现对话框 -->
                </li>
            </ul>
        </div>
        <el-dialog title="图片详情页" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <el-row>

                <el-col :span="12">
                    <div class="image-container">
                        <el-image width="300px"></el-image>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="info-container">
                        <p>ID: {{ detailDialogImgID }}</p>
                        <p>上传用户: {{ detailDialogImgOwner }}</p>
                        <p>喜爱人数: {{ detailDialogImgLikes }}</p>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-popconfirm title="确定删除这幅图像吗？" @confirm="delDetailImg"><el-button type="danger" slot="reference" >删 除</el-button></el-popconfirm>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import { refresh } from 'less';

export default {
    data() {
        return {
            uploadImgPath: '',
            fileList: [],
            imageUrls: ['../assets/crazing_1.jpg'],
            new_imageUrls: [],

            dialogVisible: false,
            detailDialogImgUrl: '../assets/crazing_1.jpg',
            detailDialogImgID: '10086',
            detailDialogImgOwner: 'JM',
            detailDialogImgLikes: 5,




            array: [] //定义空数组存储元素高度

        }
    },

    methods: {
        /** 处理上传的文件发生变化 */
        handleFileChange(file, fileList) {
            console.log(fileList)
            const isJPGPNG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
            if (!isJPGPNG) {
                this.$message.error('只能上传 JPG/PNG 文件!');
                // 从fileList中移除不符合要求的文件
                return false;
            }
            this.fileList = fileList;
            this.uploadImgPath = fileList[0].name
        },
        upload_img() {
            let file = this.fileList[0];
            let formData = new FormData();
            formData.append('uploadImg', file.raw);
            //利用axios上传图片调用函数
            this.$http.post('/uploadPublicImg', formData).then(res => {
                // 处理响应

                this.$message('上传成功');
                refreshPublicGallery();
            }).catch(error => {
                // 处理错误
                console.log(error);
            });

        },
        refreshPublicGallery() {
            this.$http.get('/getPublicGallery').then(res => {
                // 处理响应
                this.imageUrls = res.data;
                console.log(this.new_imageUrls);
            }).catch(error => {
                // 处理错误
                console.log(error);
                console.log('asdasd');
            });
        },
        handleClose(done) {
            done();
        },
        delDetailImg() {
            let formData = new FormData();
            formData.append('iid', this.detailDialogImgID);
            //利用axios上传图片调用函数
            this.$http.post('/delImg', formData).then(res => {

                this.$message('删除成功');
                this.dialogVisible = false
                refreshPublicGallery();
            }).catch(error => {
                // 处理错误
                console.log(error);
            });
        }
    },

    mounted() {
//         this.$nextTick(() => {
//     this.someMethod()
//   })
        this.refreshPublicGallery();
    }
}
</script>

<style scoped>
.title-container {
    width: 100%;
    /* 确保标题容器占据整行宽度 */
    text-align: center;
    /* 水平居中标题文本 */
    margin-bottom: 20px;
    /* 与下面的内容保持一些间距 */
    align-items: center;
}

/* 中部分：四个水平排列的组件 */
.middle {
    display: flex;
    /* 使用 Flexbox 布局 */
    justify-content: space-around;
    /* 水平间距均匀分布 */
    align-items: center;
    /* 垂直居中 */
    padding: 20px;
    background-color: #e9ecef;
    /* 浅蓝色背景 */
}

.lbl_path {
    width: 600px;
}

.component {
    flex: 1 0 20%;
    /* 宽度为容器宽度的 20%，可根据需要调整 */
    margin: 5px;
    /* 组件之间的间距 */
    padding: 10px;
    border: 1px solid #ccc;
    /* 可选：添加边框 */
    text-align: center;
    /* 文本居中 */
}
</style>