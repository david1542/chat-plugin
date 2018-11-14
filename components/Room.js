Vue.component('room', {
  computed: {
    ...Vuex.mapGetters(['activeRoom'])
  },
  template: `
  <div class="messageContentBoxWrapper">
    <template v-if="activeRoom">
      <room-header />
      <room-body />
    </template>
    <template v-else>
      <room-empty />
    </template>
  </div>
  `
})