<template>
  <div class="tabbar">
    <!-- 左侧导航栏 -->
    <div class="tabbar_left">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          v-show="item.meta.title != 'layout'"
          :to="item.path"
        >
          <span class="breadcrumb_icon">
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
          </span>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 右侧用户中心 -->
    <div class="tabbar_right">
      <el-button
        size="small"
        icon="Refresh"
        circle="true"
        @click="refresh"
      ></el-button>
      <el-button size="small" icon="FullScreen" circle="true"></el-button>
      <el-button size="small" icon="setting" circle="true"></el-button>
      <el-dropdown style="margin-right: 30px">
        <span
          class="el-dropdown-link"
          style="display: flex; align-items: center"
        >
          <img
            v-if="adminStore.teacher_id == null"
            src="@/assets/images/login.jpg"
            style="
              width: 38px;
              height: 38px;
              margin: 0 10px;
              border-radius: 50%;
            "
          />
          <span style="display: flex; align-items: center; margin-left: 20px;">
            {{ adminStore.user_name }}
          </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu v-if="adminStore.teacher_id == null">
            <el-dropdown-item @click="toLogin">前往登录</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu v-else>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAdminStore from '@/store/modules/admin'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

let $route = useRoute()
let $router = useRouter()

let adminStore = useAdminStore()

let layoutSettingStore = useLayoutSettingStore()
const refresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const toLogin = () => {
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

const logout = async () => {
  try {
    await adminStore.logout()

    // 重新登录时的重定向, 使用户重新登录后回到之前浏览的页面
    // $router.push({ path: '/login', query: { redirect: $route.path } })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  align-items: center;

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .breadcrumb_icon {
      margin: 0 3px;
      vertical-align: middle;

      svg {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}

.el-dropdown .el-dropdown-link {
  border: none;
}

.el-dropdown .el-dropdown-link:focus {
  outline: none;
}

.el-dropdown .el-dropdown-link:hover {
  border: none;
}
</style>
