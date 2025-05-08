<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="addTag">
        添加分类
      </el-button>

      <el-table style="margin: 10px 0" border :data="tagList">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="count" label="题目数量" />
        <el-table-column label="分类管理">
          <template #="{ row, $index }">
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="updateTag(row)"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="deleteTag(row)"
            ></el-button>
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

    <el-dialog v-model="addDialogForm" title="添加分类">
      <el-form style="width: 80%" :model="add" :rules="rules">
        <el-form-item label="分类名称" label-width="80px" prop="name">
          <el-input placeholder="请输入分类名称" v-model="add.name" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="default" @click="addCancel">取消</el-button>
        <el-button type="primary" size="default" @click="addConfirm">
          确认
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="updateDialogForm" title="修改分类">
      <el-form style="width: 80%" :model="update" :rules="rules">
        <el-form-item label="分类名称" label-width="80px" prop="name">
          <el-input placeholder="请输入分类名称" v-model="update.name" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="default" @click="updateCancel">取消</el-button>
        <el-button type="primary" size="default" @click="updateConfirm">
          确认
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteDialogForm" title="删除分类">
      <h2>
        即将删除分类
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
  </div>
</template>

<script setup lang="ts">
import { reqAddTag, reqDeleteTag, reqTagList, reqUpdateTag } from '@/api/tag'
import type {
  addTagForm,
  addTagResponse,
  deleteTagResponse,
  tagItem,
  TagList,
  tagListResponseData,
  updateTagForm,
  updateTagResponse,
} from '@/api/tag/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(5)
// 总条数
let total = ref<number>(0)

let tagList = ref<TagList>([])

let add = reactive<addTagForm>({
  name: '',
})

let update = reactive<updateTagForm>({
  id: 0,
  name: '',
})

let del = reactive({
  id: 0,
  name: '',
})

let addDialogForm = ref<boolean>(false)

let updateDialogForm = ref<boolean>(false)

let deleteDialogForm = ref<boolean>(false)

const getTagList = async (pager = 1) => {
  pageNo.value = pager
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

// 添加分类
const addTag = () => {
  add.name = ''
  addDialogForm.value = true
}
const addCancel = () => {
  addDialogForm.value = false
}
const addConfirm = async () => {
  let result: addTagResponse = await reqAddTag(add)
  if (result.code == 200) {
    addDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getTagList()
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    addDialogForm.value = false
  }
}

// 修改分类
const updateTag = (tag: tagItem) => {
  update.id = tag.id
  update.name = tag.name
  updateDialogForm.value = true
}
const updateCancel = () => {
  updateDialogForm.value = false
}
const updateConfirm = async () => {
  let result: updateTagResponse = await reqUpdateTag(update)
  if (result.code == 200) {
    updateDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getTagList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    updateDialogForm.value = false
  }
}

// 删除分类
const deleteTag = (tag: tagItem) => {
  del.id = tag.id
  del.name = tag.name
  if (tag.count != 0) {
    ElMessageBox.alert('无法删除已使用的分类', '删除失败', {
      confirmButtonText: '确定',
      callback: () => {},
    })
  } else {
    deleteDialogForm.value = true
  }
}
const deleteCancel = () => {
  deleteDialogForm.value = false
}
const deleteConfirm = async () => {
  let result: deleteTagResponse = await reqDeleteTag(del.id)
  if (result.code == 200) {
    deleteDialogForm.value = false
    ElMessage({
      type: 'success',
      message: result.message,
    })
    getTagList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
    deleteDialogForm.value = false
  }
}

const rules = {
  name: [
    { required: true, message: '分类名称不能为空！', trigger: 'blur' },
    {
      min: 2,
      message: '分类名称不得少于两个字符！',
      trigger: ['blur', 'change'],
    },
    {
      max: 8,
      message: '分类名称不得多于八个字符！',
      trigger: ['blur', 'change'],
    },
  ],
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
