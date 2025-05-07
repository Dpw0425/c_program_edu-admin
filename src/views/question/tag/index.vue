<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus">添加分类</el-button>

    <el-table style="margin: 10px 0" border :data="tagList">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="count" label="题目数量" />
      <el-table-column label="分类管理">
        <template #="{ row, $index }">
          <el-button type="warning" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_container">
      <el-pagination
        @current-change="getTagList"
        v-mode:current-page="pageNo"
        :page-size="limit"
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="total"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqTagList } from '@/api/tag'
import type { TagList, tagListResponseData } from '@/api/tag/type'
import { onMounted, ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(5)
// 总条数
let total = ref<number>(0)

let tagList = ref<TagList>([])

const getTagList = async () => {
  let result: tagListResponseData = await reqTagList(
    pageNo.value,
    limit.value,
    null,
  )
  if (result.code == 200) {
    total.value = result.data?.total as number
    tagList.value = result.data?.tag_list.map((item) => {
      return {
        ...item,
        count: item.count != null ? item.count : 0,
      }
    }) as TagList
  }
}

onMounted(() => {
  getTagList()
})
</script>

<style scoped lang="scss">
.box-card {
  min-height: 620px;
  position: relative;
}

.pagination_container {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 0 20px;
}
</style>
