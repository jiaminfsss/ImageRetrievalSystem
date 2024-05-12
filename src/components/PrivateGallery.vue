<!-- 整合注意事项 -->
<!-- TODO 添加超连接-->
<!-- TODO 确认uid保存方式与API设计 -->

<template>
    <div class="container" style="display: flex; flex-direction: column; height: 100vh">
        <el-row>
            <el-col :span=24>
                <div class="title-container">
                    <h2 class="search-title" style="text-align: center; font-size: 40px">
                        私人图库
                    </h2>
                    <el-button type="info">跳转检索</el-button>
                    <!-- TODO 添加超连接 -->
                </div>
            </el-col>
        </el-row>

        <el-card>
            <el-row>
                <el-col :span="18" width class="center-items">
                    <div class="flex-container">
                        <el-tag type="info" effect="dark" style="margin-right: 10px">图像路径</el-tag>
                        <el-input class="lbl_path" style="width: 100%; margin-right: 25px; margin-left: 5px;" placeholder="请输入内容" v-model="uploadImgPath"
                            :disabled="true" />
                    </div>
                </el-col>
                <el-col :span="6" class="center-items">
                    <div class="flex-container">
                        <el-upload class="upload-demo" :show-file-list="true" :file-list="fileList" ref="upload"
                            :auto-upload="false" :on-change="handleFileChange" multiple :limit="1" action="#">
                            <el-button slot="trigger" size="small" type="primary"
                                style="margin-right: 5px; margin-left: 5px;">选取图片</el-button>
                            <el-button size="small" type="success" @click="upload_img"
                                style="margin-right: 5px; margin-left: 5px;">上传图像<i
                                    class="el-icon-upload el-icon--right"></i></el-button>
                            <div slot="tip" class="el-upload__tip">
                                提示：只能上传jpg/png文件，且不超过2M;目前只支持上传一张图片。
                            </div>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card shadow="hover" style="flex: 1">
            <vue-waterfall-easy :imgsArr="showImgURL" :gap="20" :height="700" :loadingDotCount="0" :imgWidth="300"
                @click="showImgDetail">
                <div slot-scope="props">
                    <p v-html="props.value.info"></p>
                </div>
            </vue-waterfall-easy>
        </el-card>
        <el-dialog title="图片详情页" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <el-card class="box-card">
                <el-row>
                    <el-col :span="12">
                        <div class="image-container">
                            <el-image style="width: 500px; height: 500px" :src="detailDialogImgUrl"
                                fit="contain"></el-image>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="info-container">
                            <p class="attribute">ID: {{ detailDialogImgID }}</p>
                            <p class="attribute">上传用户: {{ detailDialogImgOwner }}</p>
                            <p class="attribute">喜爱人数: {{ detailDialogImgLikes }}</p>
                            <p class="attribute">分组: {{ detailDialogImgGrp }}</p>
                        </div>
                    </el-col>
                </el-row>
            </el-card>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" class="dialog-button">关 闭</el-button>
                <el-popconfirm title="确定删除这幅图像吗？" @confirm="delDetailImg">
                    <el-button type="danger" slot="reference" class="dialog-button">删 除</el-button>
                </el-popconfirm>
            </span>
        </el-dialog>

    </div>

</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
    components: {
        vueWaterfallEasy,
    },
    data() {
        return {
            uploadImgPath: '',
            fileList: [],
            showImgURL: [],
            img_detail: [],
            dialogVisible: false,
            detailDialogImgUrl: "/img/1.e7936fd7.jpg",   //require('../assets/ImageData/1.jpg'),
            detailDialogImgID: '10086',
            detailDialogImgOwner: 'JM',
            detailDialogImgLikes: 5,
            detailDialogImgGrp: '私密'
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
                this.fileList = []
                return false;
            }
            this.fileList = fileList;
            this.uploadImgPath = fileList[0].name
        },
        upload_img() {
            if (this.fileList.length != 1) {
                this.$message.error('还未选择图片');
                return;
            }
            let file = this.fileList[0];
            let formData = new FormData();
            formData.append('uploadImg', file.raw);
            //利用axios上传图片调用函数
            this.$http.post('/uploadPrivateImg', formData).then(res => {

                if (res.data.code === 200) {
                    this.$message.success('上传成功');
                    refreshPrivateGallery();
                }
                else {
                    this.$message.error('上传失败');
                    console.log(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('上传失败');
                console.log(error);
            });
            /* need API:
                url: /uploadPrivateImg
                method: post
                formData: {
                    uploadImg: file.raw
                    uid: // TODO uid来自前端或后端？
                }
                res.data: {
                    code: 200,
                    msg: '上传成功'
                }
            */
        },
        refreshPrivateGallery() {
            let formData = new FormData();
            // !! TODO formData.append('uid',uid)
            this.$http.get('/getPrivateGallery', formData).then(res => {
                // 处理响应
                this.img_detail = res.data.privateGallery;
                if (res.data.code === 200) {
                    let res_data = [];
                    for (let i = 0; i < this.img_detail.length; i++) {
                        res_data.push({
                            src: require('../assets/ImageData/' + this.img_detail[i]['path'] + '.jpg'),
                            info: '<p class="text-center" style="text-align: center;">第' + (i + 1) + '张</p>'
                        })
                    }
                    this.showImgURL = res_data;
                }
            }).catch(error => {
                // 处理错误
                console.log(error);
            });
            /* need API:
                url: /getPrivateGallery
                method: get
                formData: {
                    uid: // TODO uid来自前端或后端？
                }
                res.data: {
                    code: 200,
                    msg: '获取成功',
                    privateGallery: [
                        {
                            iid: 10086,
                            path: '1',
                            owner: 'JM',
                            likes: 5,
                            grp: '公开'
                        }
                    ]
                }
            */
        },
        handleClose(done) {
            done();
        },
        delDetailImg() {
            let formData = new FormData();
            formData.append('iid', this.detailDialogImgID);
            //利用axios上传图片调用函数
            this.$http.post('/delPrivateImg', formData).then(res => {
                if (res.data.code === 200) {
                    this.$message.success('删除成功');
                    this.dialogVisible = false
                    refreshPrivateGallery();
                }
                else {
                    this.$message.error('删除失败');
                    console.log(res.data.msg);
                }
            }).catch(error => {
                // 处理错误
                console.log(error);
                this.$message.error('删除失败');
            });
            /* need API:
                url: /delPrivateImg
                method: post
                formData: {
                    iid: 10086
                    uid: // TODO uid来自前端或后端？
                }
                res.data: {
                    code: 200,
                    msg: '删除成功'
                }
            */
        },

        showImgDetail(event, { index, value }) {
            event.preventDefault()
            // 只有当点击到图片时才进行操作
            this.dialogVisible = true
            this.detailDialogImgUrl = require('@/assets/ImageData/' + this.img_detail[index]['path'] + '.jpg')
            this.detailDialogImgID = this.img_detail[index]['iid']
            this.detailDialogImgOwner = this.img_detail[index]['owner']
            this.detailDialogImgLikes = this.img_detail[index]['likes']
            this.detailDialogImgGrp = this.img_detail[index]['groupName']
        }
    },

    mounted() {
        this.refreshPrivateGallery();
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

.info-container {
    padding: 20px;
}

.attribute {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
}

.dialog-footer {
    margin-top: 20px;
}

.dialog-button {
    margin-right: 10px;
}

.l .center-items {
    display: flex;
    align-items: center;
}

.flex-container {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>