Vue.component('inbox-app', {
  computed: {
    ...Vuex.mapState(['rooms'])
  },
  // beforeCreate () {
  //   this.$store.dispatch('fetchRooms');
  // },
  template: `
  <div v-if="rooms" class="inboxStructure">
    <div class="inboxWrapper">
      <inbox-header />
      <div class="inboxContentStructure">
        <div class="inboxLeftSection">
          <room-list :rooms="rooms" />
        </div>
        <div class="creditImageStructure">
          <img src="https://www.diamwill.com/site/assets/icons/PoweredBylucy.png">
        </div>
        <div class="inboxRightSection">
          <room />
        </div>
      </div>
    </div>
  </div>
  `
});