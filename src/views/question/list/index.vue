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
            type="info"
            size="small"
            icon="Message"
            @click="questionInfo(row)"
          ></el-button>
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

  <el-dialog v-model="infoDialogForm" title="题目详情">
    <el-descriptions style="width: 80%" :column="1" border>
      <el-descriptions-item label="标题" label-width="80px">
        {{ info.title }}
      </el-descriptions-item>
      <el-descriptions-item label="内容" label-width="80px">
        {{ info.content }}
      </el-descriptions-item>
      <el-descriptions-item label="参考答案" label-width="80px">
        <div style="white-space: pre">{{ info.answer }}</div>
      </el-descriptions-item>
      <el-descriptions-item label="难度" label-width="80px">
        {{ info.degree }}
      </el-descriptions-item>
      <el-descriptions-item label="通过率" label-width="80px">
        {{ info.passing_rate }}
      </el-descriptions-item>
      <el-descriptions-item label="状态" label-width="80px">
        {{ info.status }}
      </el-descriptions-item>
      <el-descriptions-item label="测试数据" label-width="80px">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          @click="addTestData"
        >
          添加测试数据
        </el-button>
        <el-table style="margin: 10px 0" :data="testData">
          <el-table-column
            label="序号"
            width="80px"
            border
            align="center"
            type="index"
          />
          <el-table-column prop="input" label="测试输入" align="center" />
          <el-table-column prop="output" label="期望输出" align="center" />
          <el-table-column label="测试数据管理" align="center">
            <template #="{ row, $index }">
              <el-button
                type="info"
                size="small"
                icon="Edit"
                @click="updateTestData(row)"
              ></el-button>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="deleteTestData(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-descriptions-item>
    </el-descriptions>

    <template #footer>
      <el-button size="default" @click="infoCancel">关闭</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="addTestDataDialogForm" title="新增题目测试数据">
    <el-form style="width: 80%" :model="addTest">
      <el-form-item label="测试输入" prop="input" label-width="80px">
        <el-input
          v-model="addTest.input"
          :rows="5"
          type="textarea"
          placeholder="请输入测试输入"
        />
      </el-form-item>
      <el-form-item label="期望输出" prop="output" label-width="80px">
        <el-input
          v-model="addTest.output"
          :rows="5"
          type="textarea"
          placeholder="请输入期望输出"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button size="default" @click="addTestDataCancel">取消</el-button>
      <el-button type="primary" size="default" @click="addTestDataConfirm">
        确认
      </el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="updateTestDataDialogForm" title="修改题目测试数据">
    <el-form style="width: 80%" :model="updateTest">
      <el-form-item label="测试输入" prop="input" label-width="80px">
        <el-input
          v-model="updateTest.input"
          :rows="5"
          type="textarea"
          placeholder="请输入测试输入"
        />
      </el-form-item>
      <el-form-item label="期望输出" prop="output" label-width="80px">
        <el-input
          v-model="updateTest.output"
          :rows="5"
          type="textarea"
          placeholder="请输入期望输出"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button size="default" @click="updateTestDataCancel">取消</el-button>
      <el-button type="primary" size="default" @click="updateTestDataConfirm">
        确认
      </el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="deleteTestDataDialogForm" title="删除题目测试数据">
    <h2>即将删除题目测试数据, 是否确认？</h2>

    <template #footer>
      <el-button size="default" @click="deleteTestDataCancel">取消</el-button>
      <el-button type="primary" size="default" @click="deleteTestDataConfirm">
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type {
  addQuestionForm,
  addQuestionResponse,
  addTestDataRequest,
  addTestDataResponse,
  deleteQuestionResponse,
  deleteTestDataResponse,
  getTestDataResponse,
  questionItem,
  QuestionList,
  questionListResponseData,
  testDataItem,
  testDataList,
  updateQuestionForm,
  updateQuestionResponse,
  updateTestDataRequest,
  updateTestDataResponse,
} from '@/api/question/type'
import {
  reqAddQuestion,
  reqAddTestData,
  reqDeleteQuestion,
  reqDeleteTestData,
  reqGetTestData,
  reqQuestionList,
  reqUpdateQuestion,
  reqUpdateTestData,
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

let infoDialogForm = ref<boolean>(false)

let questionList = ref<QuestionList>([])

let testData = ref<testDataList>([])

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

let info = reactive({
  id: 0,
  title: '',
  content: '',
  answer: '',
  tag: [''],
  degree: 0,
  owner_id: 0,
  passing_rate: 0,
  status: '',
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

// 题目信息
const questionInfo = async (question: questionItem) => {
  info.id = question.id
  info.title = question.title
  info.content = question.content
  info.answer = question.answer
  info.tag = question.tag
  info.degree = question.degree
  info.passing_rate = question.passing_rate
  info.status = question.status ? '公开' : '非公开'

  let result: getTestDataResponse = await reqGetTestData(question.id)
  if (result.code == 200) {
    testData.value = result.data?.test_data_list as testDataList
  }

  infoDialogForm.value = true
}
const infoCancel = () => {
  infoDialogForm.value = false
}

let addTestDataDialogForm = ref<boolean>(false)

let updateTestDataDialogForm = ref<boolean>(false)

let deleteTestDataDialogForm = ref<boolean>(false)

let addTest = reactive<addTestDataRequest>({
  question_id: 0,
  input: '',
  output: '',
})

let updateTest = reactive<updateTestDataRequest>({
  question_id: 0,
  id: 0,
  input: '',
  output: '',
})

let delTest = reactive({
  id: 0,
  question_id: 0,
})

let info_copy = reactive<questionItem>({
  id: 0,
  title: '',
  content: '',
  answer: '',
  tag: [''],
  degree: 0,
  owner_id: 0,
  passing_rate: 0,
  status: 0,
})

// 新增题目测试数据
const addTestData = () => {
  addTest.question_id = info.id
  ;(addTest.input = ''), (addTest.output = ''), Object.assign(info_copy, info)

  addTestDataDialogForm.value = true
}
const addTestDataCancel = () => {
  addTestDataDialogForm.value = false
}
const addTestDataConfirm = async () => {
  let result: addTestDataResponse = await reqAddTestData(addTest)
  if (result.code == 200) {
    addTestDataDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    await reqGetTestData(addTest.question_id)
    questionInfo(info_copy)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    addTestDataDialogForm.value = false
  }
}

// 修改题目测试数据
const updateTestData = (test: testDataItem) => {
  updateTest.question_id = test.question_id
  updateTest.id = test.id
  updateTest.input = test.input
  updateTest.output = test.output

  Object.assign(info_copy, info)

  updateTestDataDialogForm.value = true
}
const updateTestDataCancel = () => {
  updateTestDataDialogForm.value = false
}
const updateTestDataConfirm = async () => {
  let result: updateTestDataResponse = await reqUpdateTestData(updateTest)
  if (result.code == 200) {
    updateTestDataDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    await reqGetTestData(updateTest.question_id)
    questionInfo(info_copy)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    updateTestDataDialogForm.value = false
  }
}

// 删除题目测试数据
const deleteTestData = (test: testDataItem) => {
  delTest.id = test.id
  delTest.question_id = test.question_id

  Object.assign(info_copy, info)

  deleteTestDataDialogForm.value = true
}
const deleteTestDataCancel = () => {
  deleteTestDataDialogForm.value = false
}
const deleteTestDataConfirm = async () => {
  let result: deleteTestDataResponse = await reqDeleteTestData(delTest.id)
  if (result.code == 200) {
    deleteTestDataDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    await reqGetTestData(delTest.question_id)
    questionInfo(info_copy)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    deleteTestDataDialogForm.value = false
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
