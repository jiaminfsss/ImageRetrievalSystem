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
        <el-upload :headers="headers" class="upload-demo" :show-file-list="true" :file-list="fileList" ref="upload"
          :auto-upload="false" :on-change="handleFileChange" multiple :limit="1">
          <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="upload_img">上传并检索</el-button>
          <div slot="tip" class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2M;目前只支持上传一张图片。</div>
        </el-upload>
      </el-row>
    </div>
    <div id="app">
      <ul>
        <li
          ref='waterfallItem'
          v-for="(item,index) in imageUrls"
          :key="index"
        >
          <img :src="item"> 第{{index+1}}张
          </li>
      </ul>
    </div>
    <img src="../assets/crazing_1.jpg">
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
      new_imageUrls: ['https://img-blog.csdnimg.cn/885916b441af4fdfb1b83a29b9649654.png', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg', 'src/assets/crazing_1.jpg'],

      array:[] //定义空数组存储元素高度
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
    },
    // upload_img() {
    //   console.log(this.fileList)
    //   file = this.fileList[0]
    //   let formData = new FormData();
    //   formData.append('searchImage', file.raw);
    //   formData.append('kNeighbor', '30');
    //   //利用axios上传图片调用函数
    //   this.$http.post('/searchByImage', formData).then(res => {
    //     // 处理响应
    //     this.imageUrls = res.data
    //     console.log(this.new_imageUrls)
    //   }).catch(error => {
    //     // 处理错误
    //     console.log(error);
    //   });
    // }
    // }
    upload_img() {
      this.imageUrls = ['https://img-blog.csdnimg.cn/885916b441af4fdfb1b83a29b9649654.png', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg', '../assets/crazing_1.jpg'];
      let columns = 2; //定义布局的列数为2
      let item = this.$refs.waterfallItem; //获取每个子元素的DOM
      console.log("item",item);
      for (let i = 0; i < item.length; i++) {
        //遍历整个子元素的DOM集合
        if (i < columns) {
          //小于columns的子元素作为第一行
          item[i].style.top = 20 + 'px';
          item[i].style.left = item[0].clientWidth * i + "px";
          console.log("offsetWidth", item[0].clientHeight);
          this.array.push(item[i].clientHeight); //遍历结束时，数组this.array保存的是第一行子元素的元素高度
          console.log("this.array",this.array);
        } else {
          //大于等于columns的子元素将作其他行
          let minHeight = Math.min(...this.array); //  找到第一列的最小高度
          let index = this.array.findIndex(item => item === minHeight); // 找到最小高度的索引
          //设置当前子元素项的位置
          item[i].style.top = this.array[index] +25+ "px"; 
          item[i].style.left = item[index].offsetLeft + "px";
          //重新定义数组最小项的高度 进行累加
          this.array[index]+= item[i].clientHeight;
          console.log("this.array[index]",this.array[index]);
        }
      }

    }

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