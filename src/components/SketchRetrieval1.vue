<template>
  <div class="container">
    <div class="title-container">
      <h2 class="search-title" style="text-align: center;">草图搜图</h2>
    </div>
    <!-- 中部分：四个水平排列的组件 -->
    <div class="middle">
      <el-row>
        <el-button type="info" disabled>检索数据库</el-button>
        <el-select v-model="value" placeholder="选择" style="display: inline-block; margin-left: 10px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-upload :headers="headers" class="upload-demo" :show-file-list="true" :file-list="fileList"
           ref="upload" :auto-upload="false" :on-change="handleFileChange" multiple :limit="1">
          <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="upload_img">上传并检索</el-button>
          <div slot="tip" class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2M;目前只支持上传一张图片。</div>
        </el-upload>
      </el-row>
    </div>
    <

  </div>
</template>


<script>
import vueWaterfallEasy from 'vue-waterfall-easy';
export default {
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '公共数据库'
      }, {
        value: '选项2',
        label: '私人数据库'
      }, {
        value: '选项3',
        label: '组群数据库'
      }],
      value: '',
      fileList: [],
      imageUrls: ['../assets/crazing_1.jpg'],
      new_imageUrls:['../assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg']
    }
  },

  methods:{
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
    },
    upload_img() {
      console.log(this.fileList)
      file = this.fileList[0]
      let formData = new FormData();
      formData.append('searchImage', file.file);
      formData.append('kNeighbor', 30);
      //利用axios上传图片调用函数
      this.$http.post('/searchByImage', formData).then(res => {
        // 处理响应
        this.imageUrls = res.data
        console.log(this.new_imageUrls)
      }).catch(error => {
        // 处理错误
        console.log(error);
      });
    }
  }
    // upload_img() {
    //   imageUrls = ['../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg','../assets/crazing_1.jpg']
    // }

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
</style>