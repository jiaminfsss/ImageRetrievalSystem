<template>
  <div class="manage">
    <div class="content-container">
      <div class="manage-header">
        <el-button type="primary">+ 新增</el-button>
        <common-form inline :formLabel="formLabel" :form="searchFrom">
          <el-button type="primary">搜索</el-button>
        </common-form>
      </div>
    </div>
    <div class="card-container">
      <el-card class="card-content">
        <common-table
          :tableData="tableData"
          :tableLabel="tableLabel"
          :config="config"
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
      //表格
      //生成mock数据
      tableData: [
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
      ],
      tableLabel: [
        {
          prop: "gid",
          label: "组群ID",
          width: "200",
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
      this.config.loading = true;
      this.$http
        .get("/api/user/getGroupInfoByUid", {
          params: {
            uid: userid,
            page: this.config.page,
          },
        })
        .then((res) => {
          this.tableData = res.data.list;
        });
      this.config.total = res.data.count;
      this.config.loading = false;
    },
  },
  created() {
    const uid = this.$store.state.userInfo.uid;
    // getList(uid);
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
