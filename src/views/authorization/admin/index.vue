<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus">新增管理员</el-button>

    <el-table style="margin: 10px 0" border :data="adminList">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column prop="user_name" label="姓名" align="center" />
      <el-table-column prop="teacher_id" label="工号" align="center" />
      <el-table-column prop="permission" label="权限" align="center" />
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
        @current-change="getAdminList"
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
import type { AdminList, adminListResponseData } from '@/api/authorization/type'
import { reqAdminList } from '@/api/authorization'
import { onMounted, ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(5)
// 总条数
let total = ref<number>(0)

let adminList = ref<AdminList>([])

const getAdminList = async () => {
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
