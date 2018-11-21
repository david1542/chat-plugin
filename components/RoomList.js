Vue.component('room-list', {
  props: {
    rooms: {
      required: true,
      type: Array
    }
  },
  mounted () {
    console.log('Room list mounted')
    console.log(this.rooms);
  },
  template: `
    <div class="roomListContainer">
      <room-list-item
        v-for="room in rooms"
        :room="room"
        :key="room._id" />
    </div>
  `
})