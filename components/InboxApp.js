Vue.component('inbox-app', {
  computed: {
    ...Vuex.mapState(['rooms', 'currentView'])
  },
  beforeCreate () {
    this.$store.dispatch('fetchRooms');
  },
  template: `
  <div v-if="rooms" class="inboxStructure">
    <div class="inboxWrapper">
      <inbox-header />
      <div class="inboxContentStructure">
        <template v-if="currentView === 'rooms'">
          <div class="inboxLeftSection">
            <room-list :rooms="rooms" />
          </div>
          <div class="creditImageStructure">
            <img src="https://www.diamwill.com/site/assets/icons/PoweredBylucy.png">
          </div>
          <div class="inboxRightSection">
            <room />
          </div>
        </template>
        <template v-if="currentView === 'new-message'">
          <message-create />
        </template>
      </div>
    </div>
  </div>
  `
});