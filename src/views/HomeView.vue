<template>
  <div class="home">
    <FullCalendar :options="calendarOptions" ref="fullCalendar">
      <template v-slot:eventContent="arg">
        <div class="event-block">
          <img :src="arg.event.extendedProps.image" alt="" style="width: 100%">
          <p style="text-align: center">{{ arg.event.title }}</p>
        </div>
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
import {computed, reactive, ref} from 'vue';
import {getEventObj} from "@/util/event";
import { useStore } from 'vuex'
import {setCalendar} from "@/util/get-calender";
import {getSetting, setSetting} from "@/util/setting";

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
  setSetting('startDay', index)
}
const store = useStore()
// 初始化日历
let calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  locales: [zhCnLocale],
  locale: 'zh-cn',
  initialView: 'dayGridMonth',
  firstDay: computed(() => getSetting('startDay')),
  weekends  : computed(() => getSetting('weekends')),
  eventDisplay: 'block',
  events: [{
    title  : 'event1',
    start  : '2023-08-01',
  }],
  dateClick: (obj: any) => {
    const title = window.prompt('输入剧名')
    obj.view.calendar.addEvent(getEventObj({
     start: obj.dateStr,
     end: obj.dateStr,
     allDay: obj.allDay,
     title
   }))
  },
  eventClassNames: () => {
    return ['calender__event-wrapper']
  },
})
let fullCalendar = ref(null)
// 保存日历到全局
setCalendar(fullCalendar);

let toggleWeek = () => setSetting('weekends', !getSetting('weekends'))
</script>
