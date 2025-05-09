<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="addAdmin">新增管理员</el-button>

      <el-table style="margin: 10px 0" border :data="adminList">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column prop="user_name" label="姓名" align="center" />
        <el-table-column prop="teacher_id" label="工号" align="center" />
        <el-table-column prop="permission" label="权限" align="center">
          <template #="{ row }">
            <span>
              {{ mapPermissions(row.permission) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="账号状态" align="center" />
        <el-table-column label="用户管理" align="center">
          <template #="{ row, $index }">
            <el-button type="warning" size="small" icon="Edit" @click="updateAdmin(row)"></el-button>
            <el-button type="danger" size="small" icon="Delete" @click="deleteAdmin(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination_container">
        <el-pagination @current-change="getAdminList" v-mode:current-page="pageNo" :page-size="limit" background
          layout="prev, pager, next, jumper, ->, total" :total="total" />
      </div>
    </el-card>

    <el-dialog v-model="addDialogForm" title="添加管理员">
        <el-form style="width: 80%;" :model="add" :rules="rules">
            <el-form-item label="姓名" label-width="80px" prop="user_name">
              <el-input placeholder="请输入教师姓名" v-model="add.user_name" />
            </el-form-item>
            <el-form-item label="工号" label-width="80px" prop="teacher_id">
              <el-input placeholder="请输入教师工号" v-model="add.teacher_id" />
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input placeholder="请输入密码" v-model="add.password" show-password />
            </el-form-item>
            <el-form-item label="权限" label-width="80px">
              <el-checkbox-group v-model="checkPermission">
                <el-checkbox label="auth">权限管理</el-checkbox>
                <el-checkbox label="question">题目管理</el-checkbox>
                <el-checkbox label="bank">题库管理</el-checkbox>
                <el-checkbox label="competition">比赛管理</el-checkbox>
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

    <el-dialog v-model="updateDialogForm" title="修改管理员信息">
      <el-form :model="update" style="width: 80%" :rules="rules">
        <el-form-item label="工号" label-width="80px" prop="teacher_id">
          {{ update.teacher_id }}
        </el-form-item>
        <el-form-item label="姓名" label-width="80px" prop="user_name">
          <el-input placeholder="请输入教师姓名" v-model="update.user_name" />
        </el-form-item>
        <el-form-item label="权限" label-width="80px">
          <el-checkbox-group v-model="updatePermission">
            <el-checkbox label="auth">权限管理</el-checkbox>
            <el-checkbox label="question">题目管理</el-checkbox>
            <el-checkbox label="bank">题库管理</el-checkbox>
            <el-checkbox label="competition">比赛管理</el-checkbox>
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

    <el-dialog v-model="deleteDialogForm" title="删除管理员">
      <h2>
        即将删除管理员
        <span style="color: red">{{ del.user_name }}</span>
        , 是否确认？
      </h2>
        <template #footer>
          <el-button size="default" @click="deleteCancel">取消</el-button>
          <el-button type="primary" size="default" @click="deleteConfirm">
            确认
          </el-button>
        </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { addAdminForm, addAdminResponseData, adminItem, AdminList, adminListResponseData, deleteAdminResponse, updateAdminForm, updateAdminReponse } from '@/api/authorization/type'
import { reqAddAdmin, reqAdminList, reqDeleteAdmin, reqUpdateAdmin } from '@/api/authorization'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(5)
// 总条数
let total = ref<number>(0)

let adminList = ref<AdminList>([])

let checkPermission = ref<Array<string>>([])

let updatePermission = ref<Array<string>>([])

let addDialogForm = ref<boolean>(false)

let updateDialogForm = ref<boolean>(false)

let deleteDialogForm = ref<boolean>(false)

let add = reactive<addAdminForm>({
  user_name: '',
  password: '',
  teacher_id: '',
  permission: '',
})

let update = reactive<updateAdminForm>({
  id: 0,
  user_name: '',
  teacher_id: '',
  permission: '',
})

let del = reactive({
  id: 0,
  user_name: '',
})

// 定义权限映射关系
const permissionMap: Record<string, string> = {
  auth: '权限管理',
  question: '题目管理',
  bank: '题库管理',
  competition: '比赛管理',
  any: '全部权限'
}

// 映射方法
function mapPermissions(permissionStr: string): string {
  if (!permissionStr) return ''
  const parts = permissionStr.split(',').map(p => p.trim())
  const mapped = parts.map(p => permissionMap[p] || p)
  return mapped.join(', ')
}

const getAdminList = async (pager = 1) => {
  pageNo.value = pager
  let result: adminListResponseData = await reqAdminList(
    pageNo.value,
    limit.value,
    null,
  )
  if (result.code == 200) {
    total.value = result.data?.total as number
    adminList.value = result.data?.admin_list as AdminList
  }
}

// 添加管理员
const addAdmin = () => {
  add.user_name = ''
  add.password = ''
  add.teacher_id = ''
  add.permission = ''
  addDialogForm.value = true
}
const addCancel = () => {
  addDialogForm.value = false
}
const addConfirm = async () => {
  if (checkPermission.value.length === 4) {
    add.permission = 'any'
  } else {
    add.permission = checkPermission.value.join(',')
  }
  let result: addAdminResponseData = await reqAddAdmin(add)
  if (result.code == 200) {
    addDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getAdminList()
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    addDialogForm.value = false
  }
}

// 修改管理员信息
const updateAdmin = (admin: adminItem) => {
  update.id = admin.id
  update.teacher_id = admin.teacher_id
  update.user_name = admin.user_name
  if (admin.permission === 'any') {
    updatePermission.value = ['auth', 'question', 'bank', 'competition']
  } else {
    updatePermission.value = admin.permission.split(',')
  }
  updateDialogForm.value = true
}
const updateCancel = () => {
  updateDialogForm.value = false
}
const updateConfirm = async () => {
  if (updatePermission.value.length === 4) {
    update.permission = 'any'
  } else {
    update.permission = updatePermission.value.join(',')
  }
  let result: updateAdminReponse = await reqUpdateAdmin(update)
  if (result.code == 200) {
    updateDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getAdminList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    updateDialogForm.value = false
  }
}

// 删除管理员
const deleteAdmin = (admin: adminItem) => {
  del.id = admin.id
  del.user_name = admin.user_name
  deleteDialogForm.value = true
}
const deleteCancel = () => {
  deleteDialogForm.value = false
}
const deleteConfirm = async () => {
  let result: deleteAdminResponse = await reqDeleteAdmin(del.id)
  if (result.code == 200) {
    deleteDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getAdminList(pageNo.value)
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
  getAdminList()
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
