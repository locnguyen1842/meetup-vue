import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router/router'
import {store} from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.config.productionTip = false

Vue.filter('date',DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)


new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDQnhNq_Qt_PLBvfwOd4DWeick3yaF437k",
      authDomain: "meetup-vue-1276f.firebaseapp.com",
      databaseURL: "https://meetup-vue-1276f.firebaseio.com",
      projectId: "meetup-vue-1276f",
      storageBucket: "meetup-vue-1276f.appspot.com",
      messagingSenderId: "909503565277",
      appId: "1:909503565277:web:1d65aca87693f40c"
    })
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.$store.dispatch('autoSignIn',user)
          this.$store.dispatch('fetchUserData')
        }

      }
    )
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
