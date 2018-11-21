Vue.component('room-body', {
  computed: {
    ...Vuex.mapGetters(['activeRoom']),
    messages () {
      return this.activeRoom.messages;
    }
  },
  mounted () {
    this.scrollToBottom();
  },
  watch: {
    activeRoom () {
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    }
  },
  methods: {
    scrollToBottom () {
      const messageList = this.$el.querySelector('.messageContentBoxItemsWrapper');
      messageList.scrollTop = messageList.scrollHeight;
    }
  },
  template: `
  <div v-show="activeRoom" class="messageContentBoxItemsStructure">
    <message-list :messages="messages" />
    <message-editor
      @newMessage="scrollToBottom"
    />
  </div>
  `
})