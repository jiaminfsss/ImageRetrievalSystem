<template>
  <!-- 使用自定义表格 -->
  <div class="common-table" :data="tableData">
    <el-table :data="tableData"  stripe v-loading="config.loading"  max-height="800">
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label" :width="item.width ? item.width : 125">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="!item.type">{{ scope.row[item.prop] }}</span>
          <el-tag size="medium" effect="light" v-if="item.type === 'tag'">{{ scope.row[item.prop] }}</el-tag>
          <span class="el-icon-s-check" style="margin-left: 10px" v-if="item.type === 'admin'">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-star-on" @click="handleDetail(scope.row)">详情</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },

  methods: {
    //向父组件发送自定义事件
    handleDetail(row)
    {
        console.log("调用了row");
        console.log(row);
        this.$emit('showDetail', row)
        console.log("子组件发送了事件")
    },
    handleDelete(row) {
      console.log("子组件删除");
      console.log(row);
      this.$emit("del", row);
      console.log("子组件发送了删除事件")
    }
  }
};
</script>

<style scoped>
.common-table {
  background-color: #fff;
}
</style>
