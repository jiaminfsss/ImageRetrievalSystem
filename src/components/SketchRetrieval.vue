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
    <el-col :span="12" class="custom-select">  
      <div style="display: flex; align-items: center;">
      <el-upload  
        class="upload-demo"  
        ref="upload"  
        action="https://jsonplaceholder.typicode.com/posts/"  
        :on-preview="handlePreview"  
        :on-remove="handleRemove"  
        :file-list="fileList"  
        :auto-upload="false">  
        <el-button slot="trigger" type="primary">选取草图文件</el-button>  
        <el-button  
          style="margin-left: 10px;"  
          type="success"  
          @click="submitUpload">  
          上传并检索  
        </el-button>  
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>  
      </el-upload>  
    </div>
    </el-col>  
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
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log("邓");
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    submitUpload() {
        this.$refs.upload.submit();
      },
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
</style>