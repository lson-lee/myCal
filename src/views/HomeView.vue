<template>
  <div class="home">
    <FullCalendar :options="calendarOptions"></FullCalendar>
    <!-- <div>
      <h2>设置每周开始日期</h2>
      <span v-for="(el, index) in weekDayConfig" :key="el" @click="handleChangeStartDay(index)">{{ el }}</span>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
import { computed, ref } from 'vue';

const weekDayConfig = [
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
    '周日',
]
const handleChangeStartDay = (index: number) => {
  startDay.value = index;
}

let startDay = ref(0);
let calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  locales: [zhCnLocale],
  locale: 'zh-cn',
  initialView: 'dayGridMonth',
  firstDay: startDay.value,
  events: [{
    title  : 'event1',
    start  : '2023-08-01'
  }],
  dateClick: (obj: any) => {
    console.log('dateClick', obj)
  },
  select: console.log,
}
</script>
