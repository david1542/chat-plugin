const store = new Vuex.Store({
  state: {
    activeRoomId: null,
    currentView: 'rooms',
    emptyViews
  },
  getters: {
    activeRoom: state => {
      if (state.rooms) {
        return state.rooms.find(room => room._id === state.activeRoomId)
      }

      return null;
    },
    userId: () => {
      return window.localStorage.getItem('userId');
    },
    isUserAdmin: (state) => {
      const roles = window.localStorage.getItem('roles').split(',');
      return roles.includes('admin');
    },
    emptyView: (state, getters) => {
      let sentences;
      if (getters.isUserAdmin) {
        sentences = state.emptyViews.sentences.admin;
      } else {
        sentences = state.emptyViews.sentences.user;
      }

      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
      const randomImage = state.emptyViews.images[Math.floor(Math.random() * state.emptyViews.images.length)];

      return {
        message: randomSentence,
        image: randomImage
      };
    }
  },
  mutations: {
    setView(state, { view }) {
      if (state.currentView === view) {
        Vue.set(state, 'currentView', 'rooms');
      } else {
        Vue.set(state, 'currentView', view);
      }
    },
    setRooms(state, { rooms }) {
      Vue.set(state, 'rooms', rooms);
    },
    setActiveRoom(state, { roomId }) {
      if (state.activeRoomId === roomId) {
        Vue.set(state, 'activeRoomId', null);
      } else {
        Vue.set(state, 'activeRoomId', roomId);
      }
    },
    appendMessageToRoom(state, { message }) {
      const room = state.rooms.find(room => room._id === message.room);

      if (room) {
        room.messages.push(message);
      }
    },
    appendRoomToList (state, { room }) {
      state.rooms.push(room);
    }
  },
  actions: {
    changeView({ commit }, { view }) {
      commit('setView', { view });
    },
    changeRoom({ commit }, { roomId }) {
      return new Promise((resolve, reject) => {
        commit('setActiveRoom', { roomId })
        resolve()
      })
    },
    fetchRooms({ commit }) {
      return new Promise((resolve, reject) => {
        api.fetchRooms(
          rooms => {
            commit('setRooms', { rooms });
            resolve();
          },
          error => {
            reject(error);
          }
        )
      })
    },
    createRoom ({ commit }, payload ) {
      return new Promise(( resolve, reject ) => {
        api.createRoom(
          payload,
          room => {
            commit('appendRoomToList', { room });
            resolve(room);
          },
          error => {
            reject(error);
          }
        )
      })
    },
    sendMessage({ commit, state }, { message }) {
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