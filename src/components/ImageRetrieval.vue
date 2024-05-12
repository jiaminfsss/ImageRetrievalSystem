<template>
  <div
    class="container"
    style="display: flex; flex-direction: column; height: 100vh"
  >
    <el-row>
      <el-col span="24">
        <div class="title-container">
          <h2 class="search-title" style="text-align: center; font-size: 40px">
            图像搜图
          </h2>
        </div>
      </el-col>
    </el-row>

    <el-card>
      <el-row>
        <el-col span="12" class="center-items">
          <div class="flex-container">
            <el-tag type="info" effect="dark" style="margin-right: 1px"
              >检索数据库</el-tag
            >
            <el-select
              v-model="value"
              placeholder="选择"
              style="margin-left: 1px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col span="12" class="center-items">
          <div class="flex-container">
            <el-upload
              :headers="headers"
              class="upload-demo"
              :show-file-list="true"
              :file-list="fileList"
              ref="upload"
              :auto-upload="false"
              :on-change="handleFileChange"
              multiple
              :limit="1"
            >
              <el-button
                slot="trigger"
                size="small"
                type="primary"
                icon="el-icon-folder-opened"
                >选取图片</el-button
              >
              <el-button
                style="margin-left: 50px"
                size="small"
                type="success"
                @click="upload_img"
                >上传并检索<i class="el-icon-upload el-icon--right"></i
              ></el-button>
              <div slot="tip" class="el-upload__tip">
                提示：只能上传jpg/png文件，且不超过2M;目前只支持上传一张图片。
              </div>
            </el-upload>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="hover" style="flex: 1">
      <vue-waterfall-easy
        :imgsArr="new_imageUrls"
        :gap="20"
        :height="700"
        :loadingDotCount="0"
        :imgWidth="300"
      >
        <div slot-scope="props">
          <p v-html="props.value.info"></p>
        </div>
      </vue-waterfall-easy>
    </el-card>
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
      options: [
        {
          value: "选项1",
          label: "公共数据库",
        },
        {
          value: "选项2",
          label: "私人数据库",
        },
        {
          value: "选项3",
          label: "组群数据库",
        },
      ],
      value: "",
      fileList: [],
      imageUrls: [],
      new_imageUrls: [],
    };
  },

  methods: {
    /** 处理上传的文件发生变化 */
    handleFileChange(file, fileList) {
      console.log(fileList);
      const isJPGPNG =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      if (!isJPGPNG) {
        this.$message.error("只能上传 JPG/PNG 文件!");
        // 从fileList中移除不符合要求的文件
        return false;
      }
      this.fileList = fileList;
    },
    upload_img() {
      if(this.fileList.length == 0){
        // this.$message.error("请先上传图片!");
        this.$message({
            type: "info",
            message: "请先上传图片",
          });
        return;
      }
      this.imageUrls = [];
      this.new_imageUrls = [];
      console.log(this.fileList);
      let file = this.fileList[0];
      let formData = new FormData();
      formData.append("searchImage", file.raw);
      formData.append("kNeighbor", "30");
      //利用axios上传图片调用函数
      this.$http
        .post("/searchByImage", formData)
        .then((res) => {
          // 处理响应
          console.log(res);
          console.log("resdata");
          console.log(res.data);
          this.$set(this, "imageUrls", res.data);
          console.log(this.imageUrls);
          for (var i = 0; i < 30; i++) {
            console.log(i);
            console.log(this.imageUrls[i]);

            let newsrc = require("../assets/ImageData/" +
              this.imageUrls[i] +
              ".jpg");
            console.log(newsrc);
            this.new_imageUrls.push({
              src: newsrc,
              info:
                '<p class="text-center" style="text-align: center;">第' +
                (i + 1) +
                "张</p>",
            });
          }
          this.fileList = []
          console.log(this.new_imageUrls);
        })
        .catch((error) => {
          // 处理错误
          console.log(error);
        });
    },
    // upload_img() {
    //   for (var i = 1; i < 31; i++) {
    //     this.imageUrls.push(require('../assets/testpic/' + i + '.jpg'))
    //   }
    //   for (var i = 0; i < this.imageUrls.length; i++) {
    //     this.new_imageUrls.push({ src: this.imageUrls[i], info: '<p class="text-center" style="text-align: center;">第'+ (i+1) +'张</p>' })
    //   }
    // }
  },
};
</script>

<style scoped>
.title-container {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  align-items: center;
}

.center-items {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.flex-container {
  display: flex;
  align-items: center;
}
</style>
