const store = new Vuex.Store({
  state: {
    ...fakeData,
    activeRoomId: null,
    emptyViews: {
      admin: [
        {
          image: '../assets/inbox.png',
          message: '1st Admin empty view'
        },
        {
          image: '../assets/inbox.png',
          message: '2nd Admin empty view'
        },
        {
          image: '../assets/inbox.png',
          message: '3rd Admin empty view'
        },
        {
          image: '../assets/inbox.png',
          message: '4th Admin empty view'
        },
        {
          image: '../assets/inbox.png',
          message: '5th Admin empty view'
        }
      ],
      user: [
        {
          image: '../assets/inbox.png',
          message: '1st User empty view'
        },
        {
          image: '../assets/inbox.png',
          message: '2nd User empty view'
        },
        {
          image: '../assets/inbox.png',
          message: '3rd User empty view'
        },
        {
          image: '../assets/inbox.png',
          message: '4th User empty view'
        },
        {
          image: '../assets/inbox.png',
          message: '5th User empty view'
        }
      ]
    }
  },
  getters: {
    activeRoom: state => {
      return state.rooms.find(room => room._id === state.activeRoomId)
    },
    userId: () => {
      return window.localStorage.getItem('userId');
    },
    isUserAdmin: (state) => {
      const roles = window.localStorage.getItem('roles').split(',');
      return roles.includes('admin');
    },
    emptyView: (state, getters) => {
      let emptyViews;
      if (getters.isUserAdmin) {
        emptyViews = state.emptyViews.admin;
      } else {
        emptyViews = state.emptyViews.user;
      }

      const view = emptyViews[Math.floor(Math.random() * emptyViews.length)];

      return view;
    }
  },
  mutations: {
    setRooms (state, { rooms }) {
      Vue.set(state, 'rooms', rooms);
    },
    setActiveRoom (state, { roomId }) {
      if (state.activeRoomId === roomId) {
        Vue.set(state, 'activeRoomId', null);
      } else {
        Vue.set(state, 'activeRoomId', roomId);        
      }
    },
    appendMessageToRoom (state, { message }) {
      const room = state.rooms.find(room => room._id === message.room);

      if (room) {
        room.messages.push(message);
      }
    }
  },
  actions: {
    changeRoom ({ commit }, { roomId }) {
      return new Promise((resolve, reject) => {
        commit('setActiveRoom', { roomId })
        resolve()
      })
    },
    fetchRooms ({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.fetchRooms(
          rooms => {
            commit('setRooms', { rooms });
            resolve();
          },
          error => {
            reject();
          }
        )
      })
    },
    sendMessage ({ commit, state }, { message }) {
      return new Promise((resolve, reject) => {
        const roomId = state.activeRoomId;
        const payload = { message, roomId };
        api.sendMessage(
          payload,
          message => {
            commit('appendMessageToRoom', { message });
            resolve(message);
          },
          error => {
            reject(error);
            console.log(error);
          }
        )
      })
    }
  }
})