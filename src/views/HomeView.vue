<template>
  <div class="home">
    <FullCalendar :options="calendarOptions" ref="fullCalendar">
      <template v-slot:eventContent="arg">
        <div class="event-block">
          <v-img
              :src="arg.event.extendedProps.image"
              cover
          ></v-img>
          <p style="text-align: center">{{ arg.event.title }}</p>
        </div>
      </template>
    </FullCalendar>
    <v-dialog
        v-model="dialog"
        width="auto"
    >
      <v-card>
        <v-file-input show-size
                      accept="image/*"
                      v-model="imageRef"
                      label="File input"></v-file-input>
        <v-card-actions>
          <v-btn color="primary" block @click="handleSubmitEvent">submit</v-btn>

          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import { computed, reactive, ref } from 'vue';
import { getEventObj } from "@/util/event";
import { useStore } from 'vuex'
import { setCalendar } from "@/util/get-calender";
import { getSetting, setSetting } from "@/util/setting";

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
  weekends: computed(() => getSetting('weekends')),
  eventDisplay: 'block',
  events: [{
    title: 'event1',
    start: '2023-08-01',
  }],
  dateClick: (obj: any) => {
    dialog.value = true;
    eventObjRef = obj;
  },
  eventClassNames: () => {
    return ['calender__event-wrapper']
  },
})
let fullCalendar = ref(null)
let dialog = ref(false);
let imageRef = ref(null);
let eventObjRef = reactive({});
// 保存日历到全局
setCalendar(fullCalendar);

let toggleWeek = () => setSetting('weekends', !getSetting('weekends'))
const handleSubmitEvent = () => {
  window.ttService.on("complete", (info) => {
    const {ImageUri, ImageFormat} = info.uploadResult;
    eventObjRef.view.calendar.addEvent(getEventObj({
      start: eventObjRef.dateStr,
      end: eventObjRef.dateStr,
      allDay: eventObjRef.allDay,
      image: `http://pic.lsonlee.top/${ImageUri}~tplv-a87o067aj7-image.image`,
      title: 'test',
    }))
  });
  window.ttService.start(window.ttService.addImageFile({
    file: imageRef.value[0],
    stsToken: window.ttConfig,
  }));
}
</script>
