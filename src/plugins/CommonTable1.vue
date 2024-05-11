<template>
    <!-- 使用自定义表格 -->
    <div class="common-table" :data="tableData" height="90%" stripe>
        <el-table>
            <el-table-column label="序号" width="85">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{(config.page - 1)*20 scope.row.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object
    },
}
</script>


<style scoped>
.common-table{
    background-color: #fff;
    position: relative;
}
.pager{
    position: absolute;
    bottom: 20px;
    right:20px
}
</style>