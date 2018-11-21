Vue.component('message-create', {
  data () {
    return {
      message: {
        subject: '',
        content: ''
      }
    }
  },
  methods: {
    ...Vuex.mapActions(['changeView', 'createRoom']),
    sendMessage () {
      this.createRoom({ message: this.message }).then(() => {
        this.backToRooms();
      })
    },
    backToRooms () {
      this.changeView({view: 'rooms' });
    }
  },
  computed: {
    ...Vuex.mapState(['theme'])
  },
  template: `
    <div class="inputsStructure">
      <button
        class="inputsBackButton"
        @click="backToRooms"
      >
        <div>
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div>
          BACK
        </div>
      </button>
      <h1 class="inputsTitle">Create a new message</h1>
      <div class="inputContainerStructure">
        <div class="inputStructure" style="margin-right: 0px;">
          <input
            type="text"
            placeholder="Subject"
            v-model="message.subject"
          />
        </div>
        <div class="textAreaStructure">
          <textarea
            type="tel"
            id="contactus_message"
            placeholder="Write a message"
            v-model="message.content"
          >
          </textarea>
        </div>
      </div>          
      <button
        class="submitButton"
        @click="sendMessage"
      >
        SUBMIT
      </button>
    </div>
  `
})