Vue.component('inbox-header', {
  computed: {
    numberOfMessages () {
      return this.$store.state.rooms.length;
    }
  },
  template: `
  <div class="inboxHeaderSection">
    <div class="inboxLeftTitleHeader">
      All Messages <span class="inboxCountMessagesHeader">({{ numberOfMessages }})</span> <i class="fa fa-sort-down"></i></div>
    <div class="inboxRightTitleHeader">
      <div class="inboxRightNewMessageButtonHeader">
        New Message <i class="fa fa-envelope"></i></div>
      <div class="inboxRightSearchButtonHeader"><i class="fa fa-search"></i></div>
    </div>
  </div>
  `
})