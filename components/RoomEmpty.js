Vue.component('room-empty', {
  computed: {
    ...Vuex.mapGetters(['emptyView'])
  },
  template: `
    <div class="emptyRoomView">
      <img :src="emptyView.image" />
      <span>{{ emptyView.message }}</span>
    </div>
  `
})