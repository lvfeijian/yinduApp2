
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)
// const i18n = new VueI18n({
//   locale: localStorage.lang || 'zh',
//   messages: {
//     'en': require('@/lang/en'),
//     'zh': require('@/lang/zh'),
//     'spain': require('@/lang/spain'),
//   }
// })

// export default i18n


import Vue from "vue";
import VueI18n from "vue-i18n";
import enLocale from "./en.js";
import zhLocale from "./zh.js";

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: localStorage.lang || "zh",
  messages: {
    en: {
      ...enLocale
    },
    zh: {
      ...zhLocale
    }
  }
});
export default i18n;