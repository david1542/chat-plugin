Vue.component('message-list-item', {
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...Vuex.mapState(['companyLogo']),
    myMessage () {
      const { userId } = this.$store.getters;
      const { author } = this.message;
      return userId === author._id;
    },
    isAuthorAdmin () {
      const { author } = this.message;
      return author.roles.includes('admin');
    },
    author () {
      const user = this.message.author;
      const firstName = user.firstName.replace(/^./, str => str.toUpperCase());
      const lastName = user.lastName.replace(/^./, str => str.toUpperCase());
      return `${firstName} ${lastName}`;
    },
    thumbnail () {
      return !this.isAuthorAdmin ?
        'https://www.diamwill.com/site/assets/userIconSmall.png' :
        this.companyLogo
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
          <div class="messageContentBoxItemAuthor">{{ author }}</div>
          <div class="messageContentBoxItemDesc">{{message.content}}</div>
          <div class="messageContentBoxItemDate">
            {{date}}
          </div>
        </div>
      </div>
    </div>
  `
})