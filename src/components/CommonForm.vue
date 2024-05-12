<template>
  <el-form :inline="inline":model="form" ref="form" label-width="100px">
    <el-form-item v-for="item in formLabel" :key="item.bind">
      <el-input
        v-model="form[item.bind]"
        :placeholder="item.label"
        v-if="item.type === 'input'"
      ></el-input>
      <el-select
        v-model="form[item.bind]"
        placeholder="请选择"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-switch v-model="form[item.bind]" v-if="item.type === 'switch'"></el-switch>
    </el-form-item>
    <el-form-item>
        <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array,
  },
};
</script>

<style scoped></style>
