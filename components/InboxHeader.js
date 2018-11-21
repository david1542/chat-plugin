Vue.component('inbox-header', {
  computed: {
    ...Vuex.mapState(['theme']),
    numberOfMessages () {
      return this.$store.state.rooms.length;
    }
  },
  methods: {
    showNewMessageView (view) {
      this.$store.dispatch('changeView', { view });
    }
  },
  template: `
  <div class="inboxHeaderSection">
    <div
      class="inboxLeftTitleHeader"
      @click="showNewMessageView('rooms')"
    >
      All Messages <span class="inboxCountMessagesHeader">({{ numberOfMessages }})</span> <i class="fa fa-sort-down"></i></div>
    <div class="inboxRightTitleHeader">
      <div
        class="inboxRightNewMessageButtonHeader"
        :style="{'background-color': theme.primary}"
        @click="showNewMessageView('new-message')"
      >
        New Message <i class="fa fa-envelope"></i>
      </div>
      <div class="inboxRightSearchButtonHeader"><i class="fa fa-search"></i></div>
    </div>
  </div>
  `
})