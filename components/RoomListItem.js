Vue.component('room-list-item', {
  props: {
    room: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      showTooltip: false
    }
  },
  methods: {
    changeRoom () {
      this.$store.dispatch('markAsRead', { roomId: this.room._id });
      this.$store.dispatch('changeRoom', { roomId: this.room._id });
    }
  },
  computed: {
    ...Vuex.mapState(['theme']),
    ...Vuex.mapGetters(['userId']),
    thumbnail () {
      return this.room.type === 'general' ?
        'https://www.diamwill.com/site/assets/userIconSmall.png' :
        this.room.type === 'ask-price' ?
        'https://diamwill.com/diamondpictures/7171646187_HK11-B-53_16pt.jpg' :
        'https://www.diamwill.com/site/assets/company/blackIcon.png'
    },
    newMessages () {
      return this.room.messages.reduce((total, message) => {
        if (!message.readBy.includes(this.userId)) {
          total += 1;
        }

        return total;
      }, 0);
    },
    title () {
      const title = this.room.header.title;

      return title.split(' ').map(item => {
        return item.replace(/^./, str => str.toUpperCase());
      }).join(' ');
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
    borderStyle () {
      return this.active ? '4px solid ' + this.theme.primary : 'none';
    },
    date () {
      if (this.room.createdAt) {
        // return moment(this.room.createdAt).format('MMMM Do YYYY');
        // return moment(this.room.createdAt).startOf('hour').fromNow();
        return moment(this.room.createdAt).format('L')
      }

      return '---';
    }
  },
  template: `
  <div
    class="messageBoxSubjectStructure"
    :class="{'messageBoxSubjectStructureActive': active}"
    :style="{'border-right': borderStyle}"
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
        <div class="messageBoxMainTitle">{{ title }}</div>
        <div class="messageBoxSubTitle">
          {{ date }}
        </div>
      </div>
      <div class="messageBoxMain">
        <div class="messageBoxMainTitle">{{ room.header.subtitle }}</div>
        <div class="messageBoxDate"><i class="fa fa-circle"></i> {{ roomType }}</div>
      </div>
      <div
        class="newMessagesHud"
        :class="{
          'visible': newMessages > 0,
          'hidden': newMessages === 0,
        }"
        :style="{
          'background-color': theme.primary,
          'color': theme.contrast
        }"
      >
        {{ newMessages || '' }}
      </div>
      <div
        class="messageBoxOptions"
        @mouseover="showTooltip = true"
        @mouseleave="showTooltip = false"
      >
        <i class="fa fa-ellipsis-v"></i>
        <tooltip
          v-show="showTooltip"
          message="Coming soon"
          :position="{left: '-92px', bottom: '-1px'}"
        />
      </div>
    </div>
  </div>
  `
})