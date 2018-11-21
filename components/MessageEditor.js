Vue.component('message-editor', {
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...Vuex.mapState(['theme'])
  },
  methods: {
    sendMessage () {
      this.$store.dispatch('sendMessage', { message: this.message }).then(() => {
        this.message = '';
        this.$emit('newMessage');
      });
    },
    newLine () {
      this.message += '\\n';
    }
  },
  template: `
    <div class="messageContentBoxInputStructure">
      <textarea
        rows="4"
        cols="50"
        placeholder="Write Something..."
        v-model="message"
        @keydown.enter="newLine"
      ></textarea>
      <div
        class="messageContentBoxInputButton"
        :style="{'background-color': theme.primary}"
        @click="sendMessage()"
      >
        <i class="fa fa-location-arrow"></i>
      </div>
    </div>
  `
})