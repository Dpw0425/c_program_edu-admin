<template>
  <div class="home_container">
    <div class="row">
      <div class="col-md-12">
        <div class="article">
          <div class="row">
            <div
              class="col-md-8"
              style="
                align-items: center;
                display: flex;
                justify-content: center;
              "
            >
              <svg-icon name="logo" width="80%" height="80%"></svg-icon>
            </div>

            <div class="col-md-4" style="text-align: center">
              <h2
                style="
                  font-size: 1.25rem;
                  margin: 2.5rem 0 2rem;
                  font-weight: 600;
                "
              >
                {{ getTime() }}好，
                <span style="color: #0e90d2 !important">
                  {{ adminStore.user_name }}老师
                </span>
                ！
              </h2>
              <div class="calendar">
                <div>
                  <span class="mounth">
                    {{ commonStore.month + commonStore.monthType }}
                  </span>
                  <span class="date">
                    {{ commonStore.date }}
                  </span>
                  <span class="weekday">
                    {{ commonStore.weekday }}
                  </span>
                </div>
                <span class="lunar">
                  {{ commonStore.lunarDate }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAdminStore from '@/store/modules/admin'
import useCommonStore from '@/store/modules/common'
import { getTime } from '@/utils/time'
import { onMounted } from 'vue'

let commonStore = useCommonStore()
let adminStore = useAdminStore()

onMounted(async () => {
  // 加载日历
  await commonStore.GetCalendar()
})
</script>

<style scoped lang="scss">
.home_container {
  display: block;
  margin-bottom: 2em; // TODO: 可能没用到时候删了
  box-sizing: border-box;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
}

.row {
  margin: 0 auto;
  width: 100%;
}

@media only screen and (min-width: 641px) {
  [class*='col-'] {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media only screen and (min-width: 641px) {
  .col-md-12 {
    width: 100%;
  }
}

.article {
  background: rgba(255, 255, 255, 0.7);
  padding: 16px;
  margin-bottom: 15px;
  position: relative;
  height: 302px;

  @media only screen and (min-width: 641px) {
    .row {
      margin-left: -1rem;
      margin-right: -1rem;
    }
  }
}

.calendar {
  margin-top: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mounth {
  display: inline-block;
  width: 20px;
  vertical-align: top;
  line-height: 17px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
}

.date {
  display: inline-block;
  font-size: 85px;
  vertical-align: top;
  line-height: 55px;
  font-weight: bolder;
}

.weekday {
  display: inline-block;
  width: 20px;
  vertical-align: top;
  line-height: 17px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
}

.lunar {
  display: inline-block;
  line-height: 12px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 2rem;
  font-weight: bold;
}

h2 {
  font-size: 1.25em;
}

.el-card {
  border: none;
  box-sizing: border-box;
}
</style>
