<template>
  <el-card class="box-card">
    <el-table style="margin: 10px 0" border :data="userList">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column prop="user_name" label="姓名" align="center" />
      <el-table-column prop="student_id" label="学号" align="center" />
      <el-table-column prop="grade" label="年级" align="center" />
      <el-table-column prop="status" label="账号状态" align="center" />
      <el-table-column label="用户管理" align="center">
        <template #="{ row, $index }">
          <el-button type="info" size="small" icon="Document"></el-button>
          <el-button type="warning" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_container">
      <el-pagination
        @current-change="getUserList"
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
import type { UserList, userListResponseData } from '@/api/authorization/type'
import { reqUserList } from '@/api/authorization'
import { onMounted, ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(5)
// 总条数
let total = ref<number>(0)

let userList = ref<UserList>([])

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
</style>
