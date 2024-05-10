<template>
  <div>
    <div class="title-container">
      <h2 class="search-title" style="text-align: center;">草图搜图</h2>
    </div>
    <el-row :gutter="20"> <!-- 使用gutter属性添加列间隔（可选） -->  
    <el-col :span="12" class="custom-margin"> <!-- span值可以根据需要调整 -->  
      <div style="display: flex; align-items: center;">
      <el-button type="info" disabled>检索数据库</el-button>  
      <el-select v-model="value" placeholder="选择" style="display: inline-block; margin-left: 10px;">  
        <el-option  
          v-for="item in options"  
          :key="item.value"  
          :label="item.label"  
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    </el-col>  
    <el-col :span="6" class="custom-select">  
      <div style="display: flex; align-items: center;">
      <el-upload  
        class="upload-demo"  
        ref="upload"  
        action="/searchByImage"

        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :auto-upload="false"
        multiple="false"
        :show-file-list="true"
        :limit="1"
        :on-exceed="handleExceed"
        :http-request="customHttpRequest">  
        <el-button slot="trigger" type="primary">文件上传</el-button>  
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>  
      </el-upload>
    </div>
    </el-col>  
    <el-col :span="6">
      <el-button type="primary" @click="fetchAndRenderImages">获取检索结果</el-button>
    </el-col>
    <div class="image-gallery">  
    <div class="image-wrapper" v-for="(imageUrl, index) in imageUrls" :key="index">  
      <img :src="imageUrl" alt="Image" class="gallery-image">  
    </div>
  </div>
  </el-row>

</div>
</template>


<script>
export default {
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
      imageUrls: ['src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg'],
      new_imageUrls:['src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg','src/assets/crazing_1.jpg']
    }
  },
  methods: {
    beforeUpload(file) {  
      // 可以在这里进行文件大小和类型的检查  
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';  
      const isLt500k = file.size / 1024 / 1024 < 0.5;  
  
      if (!isJPGorPNG) {  
        this.$message.error('上传图片只能是 JPG/PNG 格式!');  
        return false;  
      }  
      if (!isLt500k) {  
        this.$message.error('上传图片大小不能超过 500KB!');  
        return false;  
      }
      return true;  
    }, 
    handleSuccess(response, file, fileList) {  
      // 假设 response.data 是一个包含图片路径的数组  
      this.imageUrls = response.data; // 更新图片路径列表
      // 文件上传成功后的钩子  
      this.$message.success('图片上传成功');  
      // 你可以在这里根据返回的数据进行页面更新或其他操作  
      // 例如，跳转到搜索结果页面，或者显示搜索结果  
    }, 
    handleError(err, file, fileList) {  
      // 文件上传失败时的钩子  
      this.$message.error('图片上传失败: ' + err);  
    },  
    handleExceed(files, fileList) {  
      // 文件超出个数限制时的钩子  
      this.$message.warning('当前限制选择 1 个文件，本次选择了 ' + files.length + ' 个文件，共选择了 ' + (files.length + fileList.length) + ' 个文件');  
    }, 
    customHttpRequest(options) {  
      // 使用自定义请求来发送文件和参数  
      // 这里可以发送 kNeighbor 参数  
      let formData = new FormData();  
      formData.append('searchImage', options.file);  
      formData.append('kNeighbor', 30);  
  
      // 使用 axios 或其他库发送请求  
      this.$http.post('/searchByImage', formData).then(response => {  
        // 处理响应  
        options.onSuccess(response);  
      }).catch(error => {  
        // 处理错误  
        options.onError(error);  
      });  
    },
    fetchImage(url) {  
      // 这里只是一个示例，实际上你可能不需要调用 API 来获取图片，除非图片是动态生成的  
      // 通常情况下，你可以直接使用 imageUrls 列表中的 URL 来显示图片  
      // 但如果确实需要调用 API，则可以实现如下：  
      return axios.get(url) // 假设这是一个返回图片内容的 API（通常不是）  
        .then(response => {  
          // 在这里，你可能需要将 response.data 转换为 Blob 对象，并创建一个 URL 来显示它  
          // 但这通常不是必要的，除非图片不是直接通过 URL 提供的  
          // 这里只是一个示例，你可能需要根据实际情况来调整  
          const urlCreator = window.URL || window.webkitURL;  
          const imageUrl = urlCreator.createObjectURL(new Blob([response.data]));  
          return imageUrl;  
        });  
    },
    fetchAndRenderImages(){
      this.new_imageUrls = imageUrls
    }
  }
}
</script>


<style scoped>
.custom-margin {  
  /* 注意：这里应用margin-left到el-col可能会影响栅格布局 */  
  /* 你可以选择在内部div上应用样式 */  
}  
.custom-margin > div {  
  margin-left: 20px; /* 这里设置你想要的左边距 */  
  padding-left:250px;
} 
.custom-select > div {  
  padding-left:250px;
} 
.sketch-search-page {
  display: flex;
  flex-direction: column;
  /* 设置为列方向，以便标题和搜索结果垂直排列 */
  align-items: center;
  /* 垂直居中 */
  justify-content: flex-start;
  /* 水平方向从顶部开始 */
  padding: 20px;
}

.title-container {
  width: 100%;
  /* 确保标题容器占据整行宽度 */
  text-align: center;
  /* 水平居中标题文本 */
  margin-bottom: 20px;
  /* 与下面的内容保持一些间距 */
  align-items: center;
}

.search-title {
  /* 更改字体 */
  font-family: 'Microsoft YaHei', sans-serif;
  /* 你可以替换为你喜欢的字体 */
  /* 增大字号 */
  font-size: 45px;
  /* 你可以根据需要调整字号大小 */
  /* 其他可选的样式，如字体粗细、颜色等 */
  font-weight: bold;
  color: #333;
}

.search-row {
  width: 100%;
  margin-bottom: 20px;
}
.image-gallery {  
  display: flex;  
  flex-wrap: wrap; /* 允许图片换行 */  
  justify-content: space-between; /* 控制图片之间的水平间距 */  
}  
  
.image-wrapper {  
  /* 这里设置图片的宽度，比如 20% 会使每行最多有 5 张图片（假设没有间隙） */  
  flex: 0 0 20%; /* 不增长，不缩小，基础宽度为 20% */  
  max-width: 20%; /* 防止内容溢出 */  
  margin-bottom: 10px; /* 控制图片之间的垂直间距 */  
  box-sizing: border-box; /* 包含 padding 和 border 在内 */  
  padding: 5px; /* 如果需要的话，添加内边距 */  
}  
  
.gallery-image {  
  width: 100%; /* 图片宽度设置为容器宽度，实现等比例缩放 */  
  height: auto; /* 图片高度自动，保持原始宽高比 */  
  object-fit: cover; /* 确保图片覆盖整个容器，且不拉伸 */  
} 
</style>