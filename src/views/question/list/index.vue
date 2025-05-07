<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus">发布题目</el-button>

    <el-table style="margin: 10px 0" :data="questionList">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column prop="title" label="题目标题" align="center" />
      <el-table-column prop="tag" label="题目标签" align="center" />
      <el-table-column prop="degree" label="题目难度" align="center" />
      <el-table-column prop="passing_rate" label="正确率" align="center" />
      <el-table-column label="题目管理" align="center">
        <template #="{ row, $index }">
          <el-button type="warning" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_container">
      <el-pagination
        @current-change="getQuestionList()"
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
import type {
  QuestionList,
  questionListResponseData,
} from '@/api/question/type'
import { reqQuestionList } from '@/api/question'
import { onMounted, ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(8)
// 总条数
let total = ref<number>(0)

let questionList = ref<QuestionList>([])

const getQuestionList = async () => {
  let result: questionListResponseData = await reqQuestionList(
    pageNo.value,
    limit.value,
    null,
  )
  if (result.code == 200) {
    total.value = result.data?.total as number
    questionList.value = result.data?.question_list as QuestionList
  }
}

onMounted(() => {
  getQuestionList()
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
