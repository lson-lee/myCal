import { createStore } from 'vuex'

const defaultSetting = {
  startDay: 0,
  weekends: true,
}

export default createStore({
  state: {
    calendar: null,
    setting: {
      ...defaultSetting
    },
    events:[],
  },
  getters: {
  },
  mutations: {
    setCalendar(state, cal) {
      debugger;
      state.calendar = cal;
    },
    setSetting(state, payload) {
      state.setting[payload.key] = payload.value;
    }
  },
  actions: {
  },
  modules: {
  }
})
