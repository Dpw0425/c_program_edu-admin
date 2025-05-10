<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus" @click="addQuestion">
      发布题目
    </el-button>

    <el-table style="margin: 10px 0" :data="questionList">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column prop="title" label="题目标题" align="center" />
      <el-table-column prop="tag" label="题目标签" align="center" />
      <el-table-column prop="degree" label="题目难度" align="center" />
      <el-table-column prop="passing_rate" label="正确率" align="center" />
      <el-table-column label="题目管理" align="center">
        <template #="{ row, $index }">
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateQuestion(row)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            @click="deleteQuestion(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_container">
      <el-pagination
        @current-change="getQuestionList"
        v-mode:current-page="pageNo"
        :page-size="limit"
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="total"
      />
    </div>
  </el-card>

  <el-dialog v-model="addDialogForm" title="发布题目">
    <el-form style="width: 80%" :model="add" :rules="rules">
      <el-form-item label="题目标题" prop="title" label-width="80px">
        <el-input placeholder="请输入标题" v-model="add.title" />
      </el-form-item>
      <el-form-item label="题目内容" prop="content" label-width="80px">
        <el-input
          placeholder="请输入内容"
          :rows="5"
          type="textarea"
          v-model="add.content"
        />
      </el-form-item>
      <el-form-item label="参考答案" prop="answer" label-width="80px">
        <el-input
          :rows="5"
          type="textarea"
          placeholder="请输入参考答案"
          v-model="add.answer"
        />
      </el-form-item>
      <el-form-item label="添加标签" prop="tag" label-width="80px">
        <el-checkbox-group v-model="add.tag">
          <el-checkbox
            v-for="tag in tagList"
            :label="tag.name"
            :key="tag.id"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="选择难度" prop="degree" label-width="80px">
        <el-slider v-model="add.degree" max="10" :disabled="false"></el-slider>
      </el-form-item>
      <el-form-item label="是否公开" prop="status" label-width="80px">
        <el-radio-group v-model="add.status">
          <el-radio :label="0">公开</el-radio>
          <el-radio :label="1">非公开</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button size="default" @click="addCancel">取消</el-button>
      <el-button type="primary" size="default" @click="addConfirm">
        确认
      </el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="updateDialogForm" title="修改题目">
    <el-form style="width: 80%" :model="update" :rules="rules">
      <el-form-item label="题目标题" prop="title" label-width="80px">
        <el-input placeholder="请输入标题" v-model="update.title" />
      </el-form-item>
      <el-form-item label="题目内容" prop="content" label-width="80px">
        <el-input
          placeholder="请输入内容"
          :rows="5"
          type="textarea"
          v-model="update.content"
        />
      </el-form-item>
      <el-form-item label="参考答案" prop="answer" label-width="80px">
        <el-input
          :rows="5"
          type="textarea"
          placeholder="请输入参考答案"
          v-model="update.answer"
        />
      </el-form-item>
      <el-form-item label="修改标签" prop="tag" label-width="80px">
        <el-checkbox-group v-model="update.tag">
          <el-checkbox
            v-for="tag in tagList"
            :label="tag.name"
            :key="tag.id"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="修改难度" prop="degree" label-width="80px">
        <el-slider
          v-model="update.degree"
          max="10"
          :disabled="false"
        ></el-slider>
      </el-form-item>
      <el-form-item label="是否公开" prop="status" label-width="80px">
        <el-radio-group v-model="update.status">
          <el-radio :label="0">公开</el-radio>
          <el-radio :label="1">非公开</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button size="default" @click="updateCancel">取消</el-button>
      <el-button type="primary" size="default" @click="updateConfirm">
        确认
      </el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="deleteDialogForm" title="删除题目">
    <h2>
      即将删除题目
      <span style="color: red">{{ del.title }}, 是否确认？</span>
    </h2>

    <template #footer>
      <el-button size="default" @click="deleteCancel">取消</el-button>
      <el-button type="primary" size="default" @click="deleteConfirm">
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type {
  addQuestionForm,
  addQuestionResponse,
  deleteQuestionResponse,
  questionItem,
  QuestionList,
  questionListResponseData,
  updateQuestionForm,
  updateQuestionResponse,
} from '@/api/question/type'
import {
  reqAddQuestion,
  reqDeleteQuestion,
  reqQuestionList,
  reqUpdateQuestion,
} from '@/api/question'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { getAllTagResponseData, TagList } from '@/api/tag/type'
import { reqGetAllTag } from '@/api/tag'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(8)
// 总条数
let total = ref<number>(0)

let addDialogForm = ref<boolean>(false)

let updateDialogForm = ref<boolean>(false)

let deleteDialogForm = ref<boolean>(false)

let questionList = ref<QuestionList>([])

let add = reactive<addQuestionForm>({
  title: '',
  content: '',
  answer: '',
  tag: [],
  degree: 1,
  status: 3,
})

let update = reactive<updateQuestionForm>({
  id: 0,
  title: '',
  content: '',
  answer: '',
  tag: [],
  degree: 1,
  status: 0,
})

let del = reactive({
  id: 0,
  title: '',
})

let tagList = ref<TagList>([])

const getQuestionList = async (pager = 1) => {
  pageNo.value = pager
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

const getAllTag = async () => {
  let result: getAllTagResponseData = await reqGetAllTag()
  if (result.code == 200) {
    tagList.value = result.data?.tag_list as TagList
  }
}

// 发布题目
const addQuestion = () => {
  add.title = ''
  add.content = ''
  add.answer = ''
  add.degree = 1
  add.tag = []
  add.status = 0
  addDialogForm.value = true
}
const addCancel = () => {
  addDialogForm.value = false
}
const addConfirm = async () => {
  let result: addQuestionResponse = await reqAddQuestion(add)
  if (result.code == 200) {
    addDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getQuestionList()
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    addDialogForm.value = false
  }
}

// 修改题目
const updateQuestion = (question: questionItem) => {
  update.id = question.id
  update.title = question.title
  update.content = question.content
  update.answer = question.answer
  update.degree = question.degree
  update.tag = question.tag
  update.status = question.status
  updateDialogForm.value = true
}
const updateCancel = () => {
  updateDialogForm.value = false
}
const updateConfirm = async () => {
  let result: updateQuestionResponse = await reqUpdateQuestion(update)
  if (result.code == 200) {
    updateDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getQuestionList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    updateDialogForm.value = false
  }
}

// 删除题目
const deleteQuestion = (question: questionItem) => {
  del.id = question.id
  del.title = question.title
  deleteDialogForm.value = true
}
const deleteCancel = () => {
  deleteDialogForm.value = false
}
const deleteConfirm = async () => {
  let result: deleteQuestionResponse = await reqDeleteQuestion(del.id)
  if (result.code == 200) {
    deleteDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getQuestionList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    deleteDialogForm.value = false
  }
}

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  answer: [{ required: true, message: '请输入参考答案', trigger: 'blur' }],
  tag: [
    { type: 'array', required: true, message: '请添加标签', trigger: 'change' },
  ],
  degree: [{ required: true, message: '请选择难度', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

onMounted(() => {
  getQuestionList()
  getAllTag()
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

.el-slider {
  pointer-events: auto !important;
}
</style>
