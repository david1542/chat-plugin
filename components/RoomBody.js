Vue.component('room-body', {
  computed: {
    ...Vuex.mapGetters(['activeRoom']),
    messages () {
      return this.activeRoom.messages;
    }
  },
  template: `
  <div v-if="activeRoom" class="messageContentBoxItemsStructure">
    <message-list :messages="messages" />
    <message-editor />
  </div>
  `
})