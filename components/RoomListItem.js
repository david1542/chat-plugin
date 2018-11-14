Vue.component('room-list-item', {
  props: {
    room: {
      required: true,
      type: Object
    }
  },
  methods: {
    changeRoom () {
      this.$store.dispatch('changeRoom', { roomId: this.room._id });
    }
  },
  computed: {
    thumbnail () {
      return this.room.type === 'general' ?
        'https://www.diamwill.com/site/assets/userIconSmall.png' :
        this.room.type === 'ask-price' ?
        'https://diamwill.com/diamondpictures/7171646187_HK11-B-53_16pt.jpg' :
        'https://www.diamwill.com/site/assets/company/blackIcon.png'
    },
    active () {
      return this.room._id === this.$store.state.activeRoomId;
    },
    author () {
      return this.room.author;
    },
    roomType () {
      return this.room.type === 'general' || this.room.type === 'system' ? 'Direct Message' : 'Ask Price'
    },
    date () {
      if (this.room.createdAt) {
        return moment(this.room.createdAt).format('MMMM Do YYYY');
      }

      return '---';
    }
  },
  template: `
  <div
    class="messageBoxSubjectStructure"
    :class="{'messageBoxSubjectStructureActive': active}"
    @click="changeRoom"
  >
    <div class="messageBoxSubjectWrapper">
      <div class="messageBoxMainImage messageBoxMainCompanyImage">
        <img
          :src="thumbnail"
          :class="room.type"
        >
      </div>
      <div class="messageBoxMainTitles">
        <div class="messageBoxMainTitle">{{ room.header.title }}</div>
        <div class="messageBoxSubTitle">
          {{ date }}
        </div>
      </div>
      <div class="messageBoxMain">
        <div class="messageBoxMainTitle">{{ room.header.subtitle }}</div>
        <div class="messageBoxDate"><i class="fa fa-circle"></i> {{ roomType }}</div>
      </div>
      <div class="messageBoxOptions"><i class="fa fa-ellipsis-v"></i></div>
    </div>
  </div>
  `
})