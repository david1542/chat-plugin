Vue.component('inbox-app', {
  computed: {
    ...Vuex.mapState(['rooms', 'currentView']),
    ...Vuex.mapGetters(['sortedRooms'])
  },
  data () {
    return {
      task: null,
      wrapperHidden: false
    }
  },
  watch: {
    rooms () {
      if (this.rooms && !this.wrapperHidden) {
        activeMainTool.hideWrapper();
        this.wrapperHidden = true;
      }
    }
  },
  created () {
    this.fetchRooms();
  },
  beforeDestroy () {
    clearTimeout(this.task);
  },
  methods: {
    fetchRooms () {
      this.$store.dispatch('fetchRooms');
      this.task = setTimeout(() => {
        this.fetchRooms();
      }, 1000);
    },
    redirectToLucy () {
      window.open('https://lucyplatforms.com', '_blank');
    }
  },
  template: `
  <div v-if="sortedRooms" class="inboxStructure">
    <div class="inboxWrapper">
      <inbox-header />
      <div class="inboxContentStructure">
        <div class="inboxLeftSection">
          <room-list :rooms="sortedRooms" />
        </div>
        <div
          class="creditImageStructure"
          @click="redirectToLucy"
        >
          <img src="https://www.diamwill.com/site/assets/icons/PoweredBylucy.png">
        </div>
        <div class="inboxRightSection">
          <room v-if="currentView === 'rooms'" />
          <message-create v-else-if="currentView === 'new-message'" />
        </div>
      </div>
    </div>
  </div>
  `
});