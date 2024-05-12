<template>
  <div class="manage">
    <div class="content-container">
      <el-dialog
        :title="组群详情页"
        :visible.sync="dialogVisible"
        width="50%"
        v-if="operaterType === 'detail'"
      >
        <el-table :data="detailData">
          <el-table-column property="gid" label="组群ID"></el-table-column>
          <el-table-column property="gname" label="组群名称"></el-table-column>
          <el-table-column property="gAdmain" label="管理员"></el-table-column>
          <el-table-column
            property="memberCount"
            label="成员人数"
          ></el-table-column>
          <el-table-column
            property="imageCount"
            label="图片总数"
          ></el-table-column>
          <!-- <el-table-column property="tags" label="组群标签"></el-table-column> -->
          <el-table-column label="组群标签" width="250">
            <template slot-scope="scope">
              <el-col :span="24">
                <el-row wrap>
                  <el-col
                    v-for="(tag, index) in scope.row.tags"
                    :key="index"
                    :span="6"
                    class="tag-col"
                  >
                    <el-tag :type="getColorByContent(tag)" size="mini">{{
                      tag
                    }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer">
          <el-button type="info" size="small" @click="reportViolatation"
            >反馈违规</el-button
          >
          <el-button type="primary" size="small" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        :title="组群创建申请"
        :visible.sync="dialogVisible"
        width="25%"
        v-if="operaterType === 'addgroup'"
      >
        <el-form
          ref="form"
          :model="groupCreateForm"
          label-width="80px"
          size="mini"
        >
          <el-form-item label="组群名称">
            <el-input v-model="groupCreateForm.gname" maxlength="10" show-word-limit placeholder="给你的组群取一个响亮的名字吧~~"></el-input>
          </el-form-item>
          <!-- //组群创建的用途 -->
          <el-form-item label="活动性质">
            <el-radio-group v-model="groupCreateForm.type">
              <el-radio label="协作与创意工作">协作与创意工作</el-radio>
              <el-radio label="教学与学习">教学与学习</el-radio>
              <el-radio label="档案与记录管理">档案与记录管理</el-radio>
              <el-radio label="个人收藏与分享">个人收藏与分享</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="组群描述">
            <el-input
              type="textarea"
              v-model="groupCreateForm.desc"
              maxlength="30"
              show-word-limit
              placeholder="在这里写下你的故事，让它成为别人难忘的记忆..."
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ApplyCreateGroup"
              >立即申请</el-button
            >
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        :title="'搜索结果'"
        :visible.sync="dialogVisible"
        width="50%"
        v-if="operaterType === 'searchgroup'"
      >
        <el-table :data="SearchDataForm">
          <el-table-column property="gid" label="组群ID"></el-table-column>
          <el-table-column property="gname" label="组群名称"></el-table-column>
          <el-table-column property="gAdmain" label="管理员"></el-table-column>
          <el-table-column
            property="memberCount"
            label="成员人数"
          ></el-table-column>
          <el-table-column label="组群标签" width="250">
            <template slot-scope="scope">
              <el-col :span="24">
                <el-row wrap>
                  <el-col
                    v-for="(tag, index) in scope.row.tags"
                    :key="index"
                    :span="6"
                    class="tag-col"
                  >
                    <el-tag :type="getColorByContent(tag)" size="mini">{{
                      tag
                    }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-circle-plus-outline"
                @click="applyJoin(scope.row)"
                >申请加入</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <div class="manage-header">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addGroup"
          >新建群组</el-button
        >
        <common-form inline :formLabel="formLabel" :form="searchFrom">
          <el-button type="primary" icon="el-icon-search" @click="searchGroup"
            >搜索</el-button
          >
        </common-form>
      </div>
    </div>
    <div class="card-container">
      <el-card class="card-content">
        <common-table
          :tableData="tableData"
          :tableLabel="tableLabel"
          :config="config"
          @showDetail="displayDetail"
          @del="delGroup"
        ></common-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import sha256 from "js-sha256";

import CommonForm from "./CommonForm.vue";
import CommonTable from "./CommonTable.vue";
export default {
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      //标签颜色
      colors: [
        "primary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark",
      ],
      //搜索群组数据相关
      SearchDataForm: [
        {
          gid: "G101",
          gname: "组群A",
          gAdmain: "管理员甲",
          memberCount: 124,
          tags: ["扁平化风", "材质设计", "长阴影"],
        },
        {
          gid: "G102",
          gname: "组群B",
          gAdmain: "管理员乙",
          memberCount: 50,
          tags: ["MBE风", "手绘风", "卡通风", "渐变色", "极简主义"],
        },
        {
          gid: "G103",
          gname: "组群C",
          gAdmain: "管理员丙",
          memberCount: 17,
          tags: ["矢量插画", "水彩画风", "抽象艺术"],
        },
        {
          gid: "G104",
          gname: "组群D",
          gAdmain: "管理员丁",
          memberCount: 458,
          tags: ["印象派风", "古典复古", "3D渲染", "AI生成", "油画风"],
        },
      ],
      //当前选中群组
      currentGid: "",
      //新建组群相关
      groupCreateForm: {
        gname: "",
        type: "个人收藏与分享",
        desc: "",
      },
      //对话框
      dialogVisible: false,
      operaterType: "detail",
      //详情页面的表单
      detailData: [
        {
          gid: "1",
          gname: "组群A",
          gAdmain: "管理员甲",
          memberCount: 50,
          imageCount: 200,
          tags: ["印象派风", "古典复古", "3D渲染", "AI生成", "油画风"],
        },
      ],
      //表格
      //生成mock数据
      tableData: [],
      tableLabel: [
        {
          prop: "gid",
          label: "组群ID",
          width: "200",
          type: "tag",
        },
        {
          prop: "gname",
          label: "组群名称",
          width: "300",
        },
        {
          prop: "gAdmin",
          label: "组群管理员",
          width: "300",
          type: "admin",
        },
        {
          prop: "gDesc",
          label: "组群描述",
          width: "300",
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
      searchFrom: {
        keyword: "",
        
      },
      formLabel: [
        {
          bind: "keyword",
          label: "输入群号或者群名称",
          type: "input",
        },
      ],
    };
  },

  methods: {
    //获取已加入群组
    getList(userid) {
      console.log("getList");
      this.config.loading = true;
      // this.$http
      //   .get("/api/user/getGroupInfoByUid", {
      //     params: {
      //       uid: userid,
      //       page: this.config.page,
      //     },
      //   })
      //   .then((res) => {
      //     this.tableData = res.data.list;
      //   });
      (this.tableData = [
        {
          gid: "G001",
          gname: "Group 1",
          gDesc: "这是组群1的描述",
          gAdmin: "Admin User 1",
        },
        {
          gid: "G002",
          gname: "Group 2",
          gDesc: "这是组群2的描述",
          gAdmin: "Admin User 2",
        },
        {
          gid: "G003",
          gname: "Group 3",
          gDesc: "这是组群3的描述",
          gAdmin: "Admin User 3",
        },
        {
          gid: "G004",
          gname: "Group 4",
          gDesc: "这是组群4的描述",
          gAdmin: "Admin User 4",
        },
        {
          gid: "G005",
          gname: "Group 5",
          gDesc: "这是组群5的描述",
          gAdmin: "Admin User 5",
        },
        {
          gid: "G006",
          gname: "Group 6",
          gDesc: "这是组群6的描述",
          gAdmin: "Admin User 6",
        },
        {
          gid: "G007",
          gname: "Group 7",
          gDesc: "这是组群7的描述",
          gAdmin: "Admin User 7",
        },
        {
          gid: "G008",
          gname: "Group 8",
          gDesc: "这是组群8的描述",
          gAdmin: "Admin User 8",
        },
        {
          gid: "G009",
          gname: "Group 9",
          gDesc: "这是组群9的描述",
          gAdmin: "Admin User 9",
        },
        {
          gid: "G010",
          gname: "Group 10",
          gDesc: "这是组群10的描述",
          gAdmin: "Admin User 10",
        },
        {
          gid: "G011",
          gname: "Group 11",
          gDesc: "这是组群11的描述",
          gAdmin: "Admin User 11",
        },
        {
          gid: "G012",
          gname: "Group 12",
          gDesc: "这是组群12的描述",
          gAdmin: "Admin User 12",
        },
        {
          gid: "G013",
          gname: "Group 13",
          gDesc: "这是组群13的描述",
          gAdmin: "Admin User 13",
        },
        {
          gid: "G014",
          gname: "Group 14",
          gDesc: "这是组群14的描述",
          gAdmin: "Admin User 14",
        },
        {
          gid: "G015",
          gname: "Group 15",
          gDesc: "这是组群15的描述",
          gAdmin: "Admin User 15",
        },
        {
          gid: "G016",
          gname: "Group 16",
          gDesc: "这是组群16的描述",
          gAdmin: "Admin User 16",
        },
        {
          gid: "G017",
          gname: "Group 17",
          gDesc: "这是组群17的描述",
          gAdmin: "Admin User 17",
        },
        {
          gid: "G018",
          gname: "Group 18",
          gDesc: "这是组群18的描述",
          gAdmin: "Admin User 18",
        },
        {
          gid: "G019",
          gname: "Group 19",
          gDesc: "这是组群19的描述",
          gAdmin: "Admin User 19",
        },
        {
          gid: "G020",
          gname: "Group 20",
          gDesc: "这是组群20的描述",
          gAdmin: "Admin User 20",
        },
        {
          gid: "G021",
          gname: "Group 21",
          gDesc: "这是组群21的描述",
          gAdmin: "Admin User 21",
        },
        {
          gid: "G022",
          gname: "Group 22",
          gDesc: "这是组群22的描述",
          gAdmin: "Admin User 22",
        },
        {
          gid: "G023",
          gname: "Group 23",
          gDesc: "这是组群23的描述",
          gAdmin: "Admin User 23",
        },
        {
          gid: "G024",
          gname: "Group 24",
          gDesc: "这是组群24的描述",
          gAdmin: "Admin User 24",
        },
        {
          gid: "G025",
          gname: "Group 25",
          gDesc: "这是组群25的描述",
          gAdmin: "Admin User 25",
        },
        {
          gid: "G026",
          gname: "Group 26",
          gDesc: "这是组群26的描述",
          gAdmin: "Admin User 26",
        },
        {
          gid: "G027",
          gname: "Group 27",
          gDesc: "这是组群27的描述",
          gAdmin: "Admin User 27",
        },
        {
          gid: "G028",
          gname: "Group 28",
          gDesc: "这是组群28的描述",
          gAdmin: "Admin User 28",
        },
        {
          gid: "G029",
          gname: "Group 29",
          gDesc: "这是组群29的描述",
          gAdmin: "Admin User 29",
        },
        {
          gid: "G030",
          gname: "Group 30",
          gDesc: "这是组群30的描述",
          gAdmin: "Admin User 30",
        },
      ]),
        // this.config.total = res.data.count;
        (this.config.loading = false);
    },
    displayDetail(row) {
      console.log("父组件收到了事件");
      console.log(row);
      this.operaterType = "detail";
      this.dialogVisible = true;
      this.gid = row.gid;
    },
    //删除群组
    delGroup(row) {
      console.log("父组件删除");
      console.log(row);
      // let gid = row.gid;
      let userID = this.$store.state.userInfo.uid ? 0 : 1;
      this.$confirm("此操作将退出该群组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用删除接口位置
          this.$http
            .get("api/user/del", {
              params: {
                uid: userID,
                gid: row.gid,
              },
            })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList(userID); //更新表格
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加群组按钮触发对话框
    addGroup() {
      this.operaterType = "addgroup";
      this.dialogVisible = true;
    },
    //申请创建群组提交
    ApplyCreateGroup() {
      // 把groupCreateForm的数据通过api/createGroup 提交到后端
      this.$http
        .post("api/createGroup", {
          gname: this.groupCreateForm.gname,
          gDesc: this.groupCreateForm.gDesc,
          gAdmin: this.groupCreateForm.gAdmin,
        })
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "申请已提交，待管理员审核!",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "申请失败，请检查网络连接!",
          });
        })
        .finally(() => {
          this.dialogVisible = false;
          groupCreateForm = {
            gname: "",
            type: "个人收藏与分享",
            desc: "",
          };
        });
    },
    //反馈违规接口
    reportViolatation() {
      this.$http
        .post("api/reportViolatation", {
          uid: this.$store.state.userInfo.uid,
          gid: this.currentGid,
          reason: "",
        })
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "举报成功，等待管理员反馈！",
          });
        });
      // this.$message({
      //   type: "success",
      //   message: "举报成功，等待管理员反馈！",
      // });
      // this.dialogVisible = false;
    },
    //搜索群组按钮触发函数
    searchGroup() {
      if (!this.searchFrom.keyword) {
        this.$message({
          type: "error",
          message: "请输入搜索内容！",
        });
        return;
      }
      //调用的时候清空结果数组
      // this.SearchDataForm = [];
      //调用搜索群组接口api/searchGroup
      // this.$http
      //   .get("api/searchGroup", {
      //     params: {
      //       keyword: this.searchFrom.keyword,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     this.SearchDataForm = res.data.SearchDataForm;
      //   });
      this.operaterType = "searchgroup";
      this.dialogVisible = true;
    },

    //申请加入群组
    applyJoin(row) {
      console.log("row.gid", row.gid);
      this.$http
        .post("api/applyJoin", {
          uid: this.$store.state.userInfo.uid,
          gid: row.gid,
        })
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "申请已提交，等待管理员审核!",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "加入申请失败！",
          });
        });
    },
    //标签颜色抽取器
    getColorByContent(content) {
      const hash = sha256(content);
      const colorIndex = parseInt(hash.slice(-4), 16) % this.colors.length;
      return this.colors[colorIndex];
    },
  },
  created() {
    const uid = this.$store.state.userInfo.uid ? 0 : 1;
    console.log("userID", uid);
    this.getList(uid);
  },
};
</script>

<style scoped>
.manage {
  height: 100%;
  padding-bottom: 20px;
  overflow: hidden;
}
.content-container {
  width: 80%;
  margin: 0 auto;
  margin-bottom: -10px;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.table-container {
  display: flex;
  justify-content: center; /* 居中 */
  align-items: center; /* 垂直居中（如果表格需要垂直居中） */
  /* max-width: 800px; 自定义最大宽度 */
  margin: 0 auto; /* 自动添加左右外边距以居中 */
  padding: 20px; /* 可选，添加一些内边距 */
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.card-content {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 80%;
}

.tag-col {
  display: inline-block; /* 使el-col内部元素水平排列 */
  margin-right: 8px; /* 添加间距 */
}
</style>
