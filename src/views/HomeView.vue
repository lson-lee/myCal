<template>
  <div class="home">
    <FullCalendar :options="calendarOptions">
      <template v-slot:eventContent="arg">
        <h1>{{arg.event.title}}</h1>
      </template>
    </FullCalendar>
    <div>
      <h2>设置每周开始日期</h2>
      <span v-for="(el, index) in weekDayConfig" :key="el" @click="handleChangeStartDay(index)">{{ el }}</span>
    </div>
    <h2 @click="toggleWeek">切換是否展示週末</h2>
  </div>
</template>

<script lang="ts" setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
import {reactive, ref} from 'vue';

const weekDayConfig = [
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
]
const handleChangeStartDay = (index: number) => {
  calendarOptions.firstDay = index;
}

let startDay = ref(0);
let calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  locales: [zhCnLocale],
  locale: 'zh-cn',
  initialView: 'dayGridMonth',
  firstDay: startDay.value,
  eventDisplay: 'block',
  events: [{
    title  : 'event1',
    start  : '2023-08-01',
    backgroundColor: 'red',
  }],
  dateClick: (obj: any) => {
    console.log('dateClick', obj)
  },
  eventClassNames: () => {
    return ['calender__event-wrapper']
  },
  weekends : true,
})

let toggleWeek = () => calendarOptions.weekends  = !calendarOptions.weekends
</script>
