Vue.component('room-header', {
  computed: {
    ...Vuex.mapGetters(['activeRoom']),
    title () {
      return this.activeRoom.header.subtitle;
    },
    email () {
      return this.activeRoom.owner.email;
    }
  },
  template: `
  <div v-if="activeRoom" class="messageContentBoxHeaderStructure">
    <div class="messageContentBoxHeaderTitles">
      <div class="messageContentBoxHeaderMainImage"><img src="https://www.diamwill.com/site/assets/company/blackIcon.png"></div>
      <div class="messageContentBoxHeaderMainTitle">{{ title }}</div>
      <div class="messageContentBoxHeaderSubTitle">
        From: <span>{{ email }}</span></div>
    </div>
    <div class="messageContentBoxHeaderSubTitles"><i class="fa fa-cog"></i></div>
  </div>
  `
})