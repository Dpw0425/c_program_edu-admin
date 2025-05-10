<template>
  <div>
    <el-card class="box-card">
      <el-table style="margin: 10px 0" border :data="userList">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column prop="user_name" label="姓名" align="center" />
        <el-table-column prop="student_id" label="学号" align="center" />
        <el-table-column prop="grade" label="年级" align="center" />
        <el-table-column prop="status" label="账号状态" align="center" />
        <el-table-column label="用户管理" align="center">
          <template #="{ row, $index }">
            <el-button type="warning" size="small" icon="Edit" @click="updateUser(row)"></el-button>
            <el-button type="danger" size="small" icon="Delete" @click="deleteUser(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination_container">
        <el-pagination @current-change="getUserList" v-mode:current-page="pageNo" :page-size="limit" background
          layout="prev, pager, next, jumper, ->, total" :total="total" />
      </div>
    </el-card>

    <el-dialog v-model="updateDialogForm" title="修改用户信息">
      <el-form :model="update" style="width: 80%" :rules="rules">
        <el-form-item label="头像" label-width="80px" prop="avatar">
          <img :src="update.avatar" class="avatar">
        </el-form-item>
        <el-form-item label="年级" label-width="80px" prop="grade">
          {{ update.grade }}
        </el-form-item>
        <el-form-item label="学号" label-width="80px" prop="student_id">
          {{ update.student_id }}
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          {{ update.email }}
        </el-form-item>
        <el-form-item label="姓名" label-width="80px" prop="user_name">
          <el-input placeholder="请输入姓名" v-model="update.user_name" />
        </el-form-item>
        <el-form-item label="账号状态" label-width="80px" prop="status">
          <el-radio-group v-model="update.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">封禁</el-radio>
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

    <el-dialog v-model="deleteDialogForm" title="删除用户">
      <h2>即将删除用户<span style="color: red;">{{ del.student_id }}</span>, 是否确认？</h2>

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
import type { deleteUserResponseData, updateUserForm, updateUserResponseData, userItem, UserList, userListResponseData } from '@/api/authorization/type'
import { reqDeleteUser, reqUpdateUser, reqUserList } from '@/api/authorization'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(5)
// 总条数
let total = ref<number>(0)

let userList = ref<UserList>([])

let updateDialogForm = ref<boolean>(false)

let deleteDialogForm = ref<boolean>(false)

let update = reactive<updateUserForm>({
  user_id: '',
  student_id: '',
  email: '',
  avatar: '',
  user_name: '',
  grade: 0,
  status: 1,
})

let del = reactive({
  id: '',
  student_id: '',
})

const getUserList = async (pager = 1) => {
  pageNo.value = pager
  let result: userListResponseData = await reqUserList(
    pageNo.value,
    limit.value,
    null,
  )
  if (result.code == 200) {
    total.value = result.data?.total as number
    userList.value = result.data?.user_list as UserList
  }
}

// 修改用户信息
const updateUser = (user: userItem) => {
  update.user_id = user.user_id
  update.student_id = user.student_id
  update.email = user.email
  update.avatar = user.avatar
  update.user_name = user.user_name
  update.grade = user.grade
  update.status = user.status
  updateDialogForm.value = true
}
const updateCancel = () => {
  updateDialogForm.value = false
}
const updateConfirm = async () => {
  let result: updateUserResponseData = await reqUpdateUser(update)
  if (result.code == 200) {
    updateDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getUserList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    updateDialogForm.value = false
  }
}

// 删除用户
const deleteUser = (user: userItem) => {
  del.id = user.user_id
  del.student_id = user.student_id
  deleteDialogForm.value = true
}
const deleteCancel = () => {
  deleteDialogForm.value = false
}
const deleteConfirm = async () => {
  let result: deleteUserResponseData = await reqDeleteUser(del.id)
  if (result.code == 200) {
    deleteDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getUserList(pageNo.value)
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
  getUserList()
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

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
