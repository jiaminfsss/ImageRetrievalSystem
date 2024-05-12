<template>
  <div class="manage">
    <div class="content-container">
      <el-dialog
        :title="operaterType === 'detail' ? '组群详情页' : '创建组群'"
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
          <el-table-column property="tags" label="组群标签"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" @click="dialogVisible = false"
            >反馈违规</el-button
          >
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        :title="operaterType === 'addgroup' ? '组群创建申请' : '组群详情页'"
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
            <el-input v-model="groupCreateForm.gname"></el-input>
          </el-form-item>
          <!-- //组群创建的用途 -->
          <el-form-item label="活动性质">
            <el-radio-group v-model="groupCreateForm.type">
              <el-radio label="协作与创意工作" >协作与创意工作</el-radio>
              <el-radio label="教学与学习" >教学与学习</el-radio>
              <el-radio label="档案与记录管理">档案与记录管理</el-radio>
              <el-radio label="个人收藏与分享">个人收藏与分享</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="组群描述">
            <el-input type="textarea" v-model="groupCreateForm.desc"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即申请</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class="manage-header">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addGroup"
          >新建群组</el-button
        >
        <common-form inline :formLabel="formLabel" :form="searchFrom">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
          v-if="!searchFrom.keyword"
        ></common-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import CommonForm from "./CommonForm.vue";
import CommonTable from "./CommonTable.vue";
export default {
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      //新建组群相关
      groupCreateForm: {
        gname: '',
        type: '个人收藏与分享',
        desc:''
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
          tags: "标签1, 标签2, 标签3",
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
          label: "",
          type: "input",
        },
      ],
    };
  },

  methods: {
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
    },
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
    addGroup() {
      this.operaterType = "addgroup";
      this.dialogVisible = true;
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
</style>
