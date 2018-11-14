Vue.component('message-editor', {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage () {
      this.$store.dispatch('sendMessage', { message: this.message });
    }
  },
  template: `
    <div class="messageContentBoxInputStructure">
      <textarea
        rows="4"
        cols="50"
        placeholder="Write Something..."
        v-model="message"
      ></textarea>
      <div
        class="messageContentBoxInputButton"
        @click="sendMessage()"
      >
        <i class="fa fa-location-arrow"></i>
      </div>
    </div>
  `
})