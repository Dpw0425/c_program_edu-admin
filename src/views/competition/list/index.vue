<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="addCompetition">创建比赛</el-button>

      <el-table style="margin: 10px 0;" :data="competitionList">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column prop="name" label="比赛名称" align="center" />
        <el-table-column prop="start_time" label="开始时间" align="center" />
        <el-table-column prop="deadline" label="截止时间" align="center" />
        <el-table-column prop="status" label="比赛状态" align="center">
          <template #="{ row, $index }">
            <span>
              {{ 
                (() => {
                  const now = new Date()
                  const startTime = new Date(row.start_time)
                  const endTime = new Date(row.deadline)

                  if (now < startTime) {
                    return '未开始'
                  } else if (now >= startTime && now <= endTime) {
                    return '进行中'
                  } else {
                    return '已结束'
                  }
                })()
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="比赛类别" align="center">
          <template #="{ row, $index }">
            <span>
              {{
                row.category === 0 ? '个人赛' : '团体赛'
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="比赛权限" align="center">
          <template #="{ row, $index }">
            <span>
              {{
                row.permission === 0 ? '公开' : '需审批'
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="比赛管理" align="center">
          <template #="{ row, $index }">
            <el-button type="info" size="small" icon="Message" @click=""></el-button>
            <el-button type="warning" size="small" icon="Edit" @click="updateCompetition(row)"></el-button>
            <el-button type="danger" size="small" icon="Delete" @click="deleteCompetition(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination_container">
        <el-pagination
          @current-change=""
          v-model:current-page="pageNo"
          :page-size="limit"
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="total"
        />
      </div>
    </el-card>

    <el-dialog v-model="addDialogForm" title="创建比赛">
      <el-form style="width: 80%" :model="add" :rules="rules"> 
        <el-form-item label="比赛名称" prop="name" label-width="80px">
          <el-input placeholder="请输入名称" v-model="add.name" />
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time" label-width="80px">
          <el-date-picker v-model="add.start_time" type="datetime" placeholder="选择日期时间" align="right" />
        </el-form-item>
        <el-form-item label="截止时间" prop="deadline" label-width="80px">
          <el-date-picker v-model="add.deadline" type="datetime" placeholder="选择日期时间" align="right" />
        </el-form-item>
        <el-form-item label="比赛类别" prop="category" label-width="80px">
          <el-radio-group v-model="add.category">
            <el-radio :label="0">个人赛</el-radio>
            <el-radio :label="1">团体赛</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报名权限" prop="permission" label-width="80px">
          <el-radio-group v-model="add.permission">
            <el-radio :label="0">公开</el-radio>
            <el-radio :label="1">需审批</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="default" @click="addCancel">取消</el-button>
        <el-button type="primary" size=default @click="addConfirm">确认</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="updateDialogForm" title="修改比赛信息">
      <el-form style="width: 80%" :model="update" :rules="rules"> 
        <el-form-item label="比赛名称" prop="name" label-width="80px">
          {{ update.name }}
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time" label-width="80px">
          <el-date-picker v-model="update.start_time" type="datetime" placeholder="选择日期时间" align="right" />
        </el-form-item>
        <el-form-item label="截止时间" prop="deadline" label-width="80px">
          <el-date-picker v-model="update.deadline" type="datetime" placeholder="选择日期时间" align="right" />
        </el-form-item>
        <el-form-item label="比赛类别" prop="category" label-width="80px">
          <el-radio-group v-model="update.category">
            <el-radio :label="0">个人赛</el-radio>
            <el-radio :label="1">团体赛</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报名权限" prop="permission" label-width="80px">
          <el-radio-group v-model="update.permission">
            <el-radio :label="0">公开</el-radio>
            <el-radio :label="1">需审批</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="default" @click="updateCancel">取消</el-button>
        <el-button type="primary" size=default @click="updateConfirm">确认</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteDialogForm" title="删除比赛信息">
      <h2>即将删除比赛<span style="color: red;">{{ del.name }}</span>, 是否确认？</h2>

      <template #footer>
        <el-button size="default" @click="deleteCancel">取消</el-button>
        <el-button type="primary" size=default @click="deleteConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqAddCompetition, reqCompetitionList, reqDeleteCompetition, reqUpdateCompetition } from '@/api/competition';
import type { addCompetitionForm, addCompetitionResponseData, competitionItem, CompetitionList, competitionListResponseData, deleteCompetitionResponseData, updateCompetitionForm, updateCompetitionResponseData } from '@/api/competition/type';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

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

let competitionList = ref<CompetitionList>([])

let add = reactive<addCompetitionForm>({
  name: '',
  start_time: '',
  deadline: '',
  category: 0,
  permission: 0,
})

let update = reactive<updateCompetitionForm>({
  id: 0,
  name: '',
  start_time: '',
  deadline: '',
  category: 0,
  permission: 0,
})

let del = reactive({
  id: 0,
  name: '',
})

// 比赛列表
const getCompetitionList = async (pager = 1) => {
  pageNo.value = pager
  let result: competitionListResponseData = await reqCompetitionList(pageNo.value, limit.value, null)
  if (result.code == 200) {
    total.value = result.data?.total as number
    competitionList.value = result.data?.competition_list.map((item) => {
      return {
        ...item,
        status: item.status != null ? item.status : 0,
        category: item.category != null ? item.category : 0,
        permission: item.permission != null ? item.permission : 0,
      }
    }) as CompetitionList
  }
}

// 创建比赛
const addCompetition = () => {
  add.name = '',
  add.start_time = '',
  add.deadline = '',
  add.category = 0,
  add.permission = 0,
  addDialogForm.value = true
}
const addCancel = () => {
  addDialogForm.value = false
}
const addConfirm = async () => {
  let result: addCompetitionResponseData = await reqAddCompetition(add)
  if (result.code == 200) {
    addDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getCompetitionList()
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    addDialogForm.value = false
  }
}

// 修改比赛信息
const updateCompetition = (competition: competitionItem) => {
  update.id = competition.id
  update.name = competition.name
  update.start_time = ''
  update.deadline = ''
  update.category = competition.category
  update.permission = competition.permission

  updateDialogForm.value = true
}
const updateCancel = () => {
  updateDialogForm.value = false
}
const updateConfirm = async () => {
  let result: updateCompetitionResponseData = await reqUpdateCompetition(update)
  if (result.code == 200) {
    updateDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getCompetitionList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    updateDialogForm.value = false
  }
}

// 删除比赛
const deleteCompetition = (competition: competitionItem) => {
  del.id = competition.id
  del.name = competition.name

  deleteDialogForm.value = true
}
const deleteCancel = () => {
  deleteDialogForm.value = false
}
const deleteConfirm = async () => {
  let result: deleteCompetitionResponseData = await reqDeleteCompetition(del.id)
  if (result.code == 200) {
    deleteDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getCompetitionList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    deleteDialogForm.value = false
  }
}

const rules = {

}

onMounted(() => {
  getCompetitionList()
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
