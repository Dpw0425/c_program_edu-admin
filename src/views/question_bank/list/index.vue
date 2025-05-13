<template>
  <div>
    <el-card class="box-card">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addQuestionBank"
      >
        创建题库
      </el-button>

      <el-table style="margin: 10px 0" :data="bankList">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="题库名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="open_grade"
          label="开放年级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="count"
          label="题目数量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="participants"
          label="参与人数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="completed"
          label="完成人数"
          align="center"
        ></el-table-column>
        <el-table-column label="题库管理" align="center">
          <template #="{ row, $index }">
            <el-button
              type="info"
              size="small"
              icon="Message"
              @click="bankInfo(row)"
            ></el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="updateBank(row)"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="deleteBank(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination_container">
        <el-pagination
          @current-change="getQuestionBankList"
          v-mode:current-page="pageNo"
          :page-size="limit"
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="total"
        />
      </div>
    </el-card>

    <el-dialog v-model="addDialogForm" title="创建空题库">
      <el-form style="width: 80%" :model="add" :rules="rules">
        <el-form-item label="题库名称" prop="name" label-width="80px">
          <el-input v-model="add.name" placeholder="请输入题库名称" />
        </el-form-item>
        <el-form-item label="题库描述" prop="content" label-width="80px">
          <el-input
            v-model="add.content"
            :rows="5"
            type="textarea"
            placeholder="请输入题库描述"
          />
        </el-form-item>
        <el-form-item label="题库描述" prop="content" label-width="80px">
          <el-checkbox-group v-model="add.open_grade">
            <el-checkbox label="21" />
            <el-checkbox label="22" />
            <el-checkbox label="23" />
            <el-checkbox label="24" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="default" @click="addCancel">取消</el-button>
        <el-button type="primary" size="default" @click="addConfirm">
          确认
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="updateDialogForm" title="修改题库信息">
      <el-form style="width: 80%" :model="update" :rules="rules">
        <el-form-item label="题库名称" prop="name" label-width="80px">
          {{ update.name }}
        </el-form-item>
        <el-form-item label="题库描述" prop="content" label-width="80px">
          <el-input
            v-model="update.content"
            :rows="5"
            type="textarea"
            placeholder="请输入题库描述"
          />
        </el-form-item>
        <el-form-item label="开放年级" prop="content" label-width="80px">
          <el-checkbox-group v-model="update.open_grade">
            <el-checkbox label="21" />
            <el-checkbox label="22" />
            <el-checkbox label="23" />
            <el-checkbox label="24" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="default" @click="updateCancel">取消</el-button>
        <el-button type="primary" size="default" @click="updateConfirm">
          确认
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteDialogForm" title="删除题库">
      <h2>
        即将删除题库
        <span style="color: red">{{ del.name }}</span>
        , 是否确认？
      </h2>

      <template #footer>
        <el-button size="default" @click="deleteCancel">取消</el-button>
        <el-button type="primary" size="default" @click="deleteConfirm">
          确认
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="infoDialogForm" title="题库详情">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="名称" label-width="80px">
          {{ info.name }}
        </el-descriptions-item>
        <el-descriptions-item label="描述" label-width="80px">
          {{ info.content }}
        </el-descriptions-item>
        <el-descriptions-item label="开放年级" label-width="80px">
          {{ info.open_grade ? info.open_grade.join(',') : null }}
        </el-descriptions-item>
        <el-descriptions-item label="参与人数" label-width="80px">
          {{ info.participants }}
        </el-descriptions-item>
        <el-descriptions-item label="完成人数" label-width="80px">
          {{ info.completed }}
        </el-descriptions-item>
        <el-descriptions-item label="题目数量" label-width="80px">
          {{ info.count }}
        </el-descriptions-item>
        <el-descriptions-item label="题目列表" label-width="80px">
          <el-button
            type="primary"
            size="default"
            icon="Plus"
            @click="addQuestionToBank"
          >
            添加题目
          </el-button>

          <el-table style="margin: 10px 0" :data="bankQuestionList">
            <el-table-column
              label="序号"
              width="80px"
              align="center"
              type="index"
            />
            <el-table-column label="标题" prop="title" align="center" />
            <el-table-column label="题目管理" align="center">
              <template #="{ row, $index }">
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  @click="deleteQuestionFromBank(row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="getQuestionInBank"
            v-mode:current-page="questionPageNo"
            :page-size="5"
            background
            layout="prev, pager, next, jumper, ->, total"
            :total="bankQuestionTotal"
          />
        </el-descriptions-item>
      </el-descriptions>

      <template #footer>
        <el-button size="default" @click="infoCancel">关闭</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="addQuestionDialogForm" title="添加题目">
      <el-table
        style="margin: 10px 0"
        :data="allQuestionList"
        border
        @selection-change="bindSelection"
      >
        <el-table-column type="selection" width="80px" align="center" />
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        />
        <el-table-column label="标题" prop="title" align="center" />
      </el-table>

      <el-pagination
        @current-change="getQuestionBesideBank"
        v-mode:current-page="allQuestionPageNo"
        :page-size="5"
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="allQuestionTotal"
      />

      <template #footer>
        <el-button size="default" @click="addQuestionCancel">取消</el-button>
        <el-button type="primary" size="default" @click="addQuestionConfirm">
          确认
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteQuestionDialogForm" title="删除题目">
      <h2>
        即将从题库
        <span style="color: red">{{ info.name }}</span>
        中移除题目
        <span style="color: red">{{ delQueFromBank.title }}</span>
        , 是否确认？
      </h2>

      <template #footer>
        <el-button size="default" @click="delQueFromBankCancel">取消</el-button>
        <el-button type="primary" size="default" @click="delQueFromBankConfirm">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type {
  questionItem,
  QuestionList,
  questionListResponseData,
} from '@/api/question/type'
import {
  reqAddBank,
  reqBankList,
  reqDeleteBank,
  reqExcludeQuestion,
  reqGetQuestion,
  reqGetQuestionBesideBank,
  reqUpdateBank,
} from '@/api/question_bank'
import type {
  addBankForm,
  addBankResponseData,
  bankItem,
  BankList,
  bankListResponseData,
  deleteBankResponseData,
  updateBankForm,
  updateBankResponseData,
} from '@/api/question_bank/type'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

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

let bankList = ref<BankList>([])

let add = reactive<addBankForm>({
  name: '',
  content: '',
  open_grade: null,
  questions: null,
})

let update = reactive<updateBankForm>({
  id: 0,
  name: '',
  content: '',
  open_grade: null,
  question_id: null,
})

let del = reactive({
  id: 0,
  name: '',
})

let info = reactive<bankItem>({
  id: 0,
  name: '',
  content: '',
  open_grade: null,
  participants: 0,
  completed: 0,
  count: 0,
})

const getQuestionBankList = async (pager = 1) => {
  pageNo.value = pager
  let result: bankListResponseData = await reqBankList(
    pageNo.value,
    limit.value,
    null,
  )
  if (result.code == 200) {
    total.value = result.data?.total as number
    bankList.value = result.data?.bank_list.map((item) => {
      return {
        ...item,
        count: item.count != null ? item.count : 0,
        participants: item.participants != null ? item.participants : 0,
        completed: item.completed != null ? item.completed : 0,
      }
    }) as BankList
  }
}

// 创建题库
const addQuestionBank = () => {
  add.name = ''
  add.content = ''
  add.open_grade = []

  addDialogForm.value = true
}
const addCancel = () => {
  addDialogForm.value = false
}
const addConfirm = async () => {
  if (!add.open_grade || add.open_grade.length === 0) {
    add.open_grade = null
  }
  let result: addBankResponseData = await reqAddBank(add)
  if (result.code == 200) {
    addDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getQuestionBankList()
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    addDialogForm.value = false
  }
}

// 题库信息
const getQuestionInBank = async (pager = 1) => {
  questionPageNo.value = pager
  let result: questionListResponseData = await reqGetQuestion(
    questionPageNo.value,
    5,
    info.id,
  )
  if (result.code == 200) {
    bankQuestionList.value = result.data?.question_list as QuestionList
    bankQuestionTotal.value = result.data?.total as number
  }
}
const getQuestionBesideBank = async (pager = 1) => {
  allQuestionPageNo.value = pager
  let result: questionListResponseData = await reqGetQuestionBesideBank(
    allQuestionPageNo.value,
    5,
    info.id,
  )
  if (result.code == 200) {
    allQuestionList.value = result.data?.question_list as QuestionList
    allQuestionTotal.value = result.data?.total as number
  }
}
const bankInfo = async (bank: bankItem) => {
  Object.assign(info, bank)

  getQuestionInBank()

  infoDialogForm.value = true
}
const infoCancel = () => {
  infoDialogForm.value = false
}

let addQuestionDialogForm = ref<boolean>(false)

const addQuestionToBank = () => {
  getQuestionBesideBank()

  update.id = info.id
  update.name = info.name
  update.content = info.content
  update.open_grade = info.open_grade

  addQuestionDialogForm.value = true
}
const bindSelection = (value: any) => {
  update.question_id = value.map((row: { id: any }) => row.id)
}
const addQuestionCancel = () => {
  addQuestionDialogForm.value = false
}
const addQuestionConfirm = async () => {
  let result: updateBankResponseData = await reqUpdateBank(update)
  if (result.code == 200) {
    addQuestionDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getQuestionInBank()
  } else {
    ElMessage({
      type: 'success',
      message: result.message,
    })
    addQuestionDialogForm.value = false
  }
}

// 修改题库信息
const updateBank = (bank: bankItem) => {
  update.id = bank.id
  update.name = bank.name
  update.content = bank.content
  update.open_grade = bank.open_grade

  updateDialogForm.value = true
}
const updateCancel = () => {
  updateDialogForm.value = false
}
const updateConfirm = async () => {
  if (!update.open_grade || update.open_grade.length === 0) {
    update.open_grade = null
  }
  let result: updateBankResponseData = await reqUpdateBank(update)
  if (result.code == 200) {
    updateDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getQuestionBankList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    updateDialogForm.value = false
  }
}

// 删除题库
const deleteBank = (bank: bankItem) => {
  del.id = bank.id
  del.name = bank.name

  deleteDialogForm.value = true
}
const deleteCancel = () => {
  deleteDialogForm.value = false
}
const deleteConfirm = async () => {
  let result: deleteBankResponseData = await reqDeleteBank(del.id)
  if (result.code == 200) {
    deleteDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getQuestionBankList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    deleteDialogForm.value = false
  }
}

let bankQuestionList = ref<QuestionList>([])

let questionPageNo = ref<number>(1)

let bankQuestionTotal = ref<number>(0)

let allQuestionList = ref<QuestionList>([])

let allQuestionPageNo = ref<number>(1)

let allQuestionTotal = ref<number>(0)

let deleteQuestionDialogForm = ref<boolean>(false)

let delQueFromBank = reactive({
  question_id: 0,
  title: '',
})

const deleteQuestionFromBank = (question: questionItem) => {
  delQueFromBank.question_id = question.id
  delQueFromBank.title = question.title

  deleteQuestionDialogForm.value = true
}
const delQueFromBankCancel = () => {
  deleteQuestionDialogForm.value = false
}
const delQueFromBankConfirm = async () => {
  let result: deleteBankResponseData = await reqExcludeQuestion(
    info.id,
    delQueFromBank.question_id,
  )
  if (result.code == 200) {
    deleteQuestionDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getQuestionInBank()
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    deleteQuestionDialogForm.value = false
  }
}

const rules = {}

onMounted(() => {
  getQuestionBankList()
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
