<template>
    <div class="container" style="display: flex; flex-direction: column; height: 100vh">
        <el-row>
            <el-col span="24">
                <div class="title-container">
                    <h2 class="search-title" style="text-align: center; font-size: 40px">
                        文字搜图
                    </h2>
                </div>
            </el-col>
        </el-row>
        <el-card>
            <el-row>
                <el-col span="12" class="center-items">
                    <div class="flex-container">
                        <el-tag type="info" effect="dark" style="margin-right: 1px">检索数据库</el-tag>
                        <el-select v-model="value" placeholder="选择" style="margin-left: 1px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col span="12" class="textarea-container">
                    <div class="flex-container">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入图像描述"
                            v-model="searchText" maxlength="100" show-word-limit resize="none"></el-input>
                        <el-button class="buttonsty" type="primary" icon="el-icon-search" round
                            @click="searchtext">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card shadow="hover" style="flex: 1">
            <vue-waterfall-easy :imgsArr="new_imageUrls" :gap="20" :height="700" :loadingDotCount="0" :imgWidth="300">
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
    name: "TextRetrieval",
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
            searchText: "",
            fileList: [],
            imageUrls: [],
            new_imageUrls: [],
        };
    },

    methods: {
        searchtext() {
            this.imageUrls = [];
            this.new_imageUrls = [];
            console.log(this.searchText);
            let formData = new FormData();
            formData.append("searchText", this.searchText);
            formData.append("kNeighbor", "30");
            //利用axios上传文字调用api:/searchByText
            this.$http
                .post("/searchByText", formData)
                .then((res) => {
                    console.log("返回的值：", res);
                    this.$set(this, "imageUrls", res.data);
                    console.log(this.imageUrls);
                    //把imageUrls里面的元素放在new_imageUrls里面
                    for (var i = 0; i < 30; i++) {
                        console.log(i);
                        console.log(this.imageUrls[i]);

                        let newsrc = require("../assets/ImageData/" +
                            this.imageUrls[i] +
                            ".jpg");
                        console.log(newsrc);
                        //一个字典包括src和info
                        this.new_imageUrls.push({
                            src: newsrc,
                            info:
                                '<p class="text-center" style="text-align: center;">第' +
                                (i + 1) +
                                "张</p>",
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
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

.textarea-container .flex-container {
    display: flex;
    justify-content: flex-start;
    /* 左对齐 */
    align-items: center;
}

.buttonsty {
    margin-left: 10px;
}
</style>
