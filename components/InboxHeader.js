Vue.component('inbox-header', {
  data () {
    return {
      searchOpened: false
    };
  },
  computed: {
    ...Vuex.mapState(['theme']),
    numberOfMessages () {
      return this.$store.state.rooms.length;
    }
  },
  methods: {
    showNewMessageView (view) {
      this.$store.dispatch('changeView', { view });
    },
    toggleSearch () {
      this.searchOpened = !this.searchOpened;

      if (this.searchOpened) {
        setTimeout(() => {
          this.$refs.searchField.focus();
        }, 0);
      }
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
      <div class="inboxRightSearchButtonHeader">
        <i
          @click="toggleSearch"
          v-show="!searchOpened"
          class="fa fa-search"
        ></i>
        <input
          type="text"
          ref="searchField"
          v-show="searchOpened"
          @blur="toggleSearch"
        />
      </div>
    </div>
  </div>
  `
})