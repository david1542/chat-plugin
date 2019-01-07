Vue.component('inbox-app', {
  computed: {
    ...Vuex.mapState(['rooms', 'currentView', 'isAuthenticated']),
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
  beforeDestroy () {
    clearTimeout(this.task);
  },
  methods: {
    redirectToLucy () {
      window.open('https://lucyplatforms.com', '_blank');
    }
  },
  template: `
  <div class="inboxStructure">
    <template v-if="sortedRooms">
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
    </template>
    <template v-else>
      <div class="authenticationFailure">
        You are not authenticated
      </div>
    </template>
  </div>
  `
});