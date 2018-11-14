Vue.component('message-list', {
  props: {
    messages: {
      required: true,
      type: Array
    }
  },
  mounted () {

  },
  template: `
    <div class="messageContentBoxItemsWrapper">
      <message-list-item
        v-for="message in messages"
        :message="message"
        :key="message._id" />
    </div>
  `
})