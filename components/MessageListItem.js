Vue.component('message-list-item', {
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  computed: {
    myMessage () {
      const { userId } = this.$store.getters;
      const { author } = this.message;
      return userId === author._id;
    },
    thumbnail () {
      return this.myMessage ?
        'https://www.diamwill.com/site/assets/userIconSmall.png' :
        'https://www.diamwill.com/site/assets/company/blackIcon.png'
    },
    date () {
      return moment(this.message.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  template: `
    <div
      class="messageContentBoxItemStructure"
      :class="{'messageContentBoxItem_in': !myMessage, 'messageContentBoxItem_out': myMessage}"
    >
      <div class="messageContentBoxItemWrapper">
        <div class="messageContentBoxItemUserImage">
          <img :src="thumbnail">
        </div>
        <div class="messageContentBoxItemDescStructure">
          <div class="messageContentBoxItemDesc">
            {{message.content}}
          </div>
          <div class="messageContentBoxItemDate">
            {{date}}
          </div>
        </div>
      </div>
    </div>
  `
})