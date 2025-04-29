<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus">添加分类</el-button>

    <el-table style="margin: 10px 0;" border>
        <el-table-column prop="date" label="序号" width="80px" align="center" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="#" label="最后更新时间" />
        <el-table-column prop="address" label="分类管理" />
    </el-table>

    <el-pagination
        v-mode:current-page="pageNo"
        :page-size="limit"
        :page-count="pager"
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(5)
// 总页数
let pager = ref<number>(10)
// 总条数
let total = ref<number>(50)
</script>

<style scoped></style>
