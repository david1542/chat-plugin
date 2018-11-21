const store = new Vuex.Store({
  state: {
    theme: {
      primary: '#c82449',
      secondary: '#6D7DE2',
      contrast: '#fff'
    },
    activeRoomId: null,
    currentView: 'rooms',
    emptyViews,
    companyLogo: 'https://www.diamwill.com/site/assets/company/blackIcon.png'
  },
  getters: {
    sortedRooms: state => {
      if (!state.rooms) return null;

      const rooms = [...state.rooms];

      const findRecentMessage = messages => {
        return messages.reduce((recentMessage, message) => {
          const recentMoment = moment(recentMessage.createdAt);
          const messageMoment = moment(message.createdAt);
          if (recentMoment.diff(messageMoment) < 0) {
            recentMessage = message;
          }

          return recentMessage;
        }, messages[0]);
      }
      rooms.sort((roomA, roomB) => {
        const recentMessageA = findRecentMessage(roomA.messages);
        const recentMessageB = findRecentMessage(roomB.messages);

        const messageATime = moment(recentMessageA.createdAt);
        const messageBTime = moment(recentMessageB.createdAt);
        if (messageATime.diff(messageBTime) < 0) {
          return 1;
        } else {
          return -1;
        }
      });

      return rooms;
    },
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
    setMessagesAsRead(state, { roomId, userId }) {
      state.rooms = state.rooms.map(room => {
        if (room._id === roomId) {
          room.messages = room.messages.map(message => {
            if (!message.readBy.includes(userId)) {
              message.readBy.push(userId);
            }

            return message;
          });
        }
        return room;
      });
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
    clearActiveRoom(state) {
      Vue.set(state, 'activeRoomId', null);
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
      // if (view === 'new-message') {
      //   commit('clearActiveRoom');
      // }
    },
    changeRoom({ commit, dispatch, getters }, { roomId }) {
      return new Promise((resolve, reject) => {
        commit('setActiveRoom', { roomId })
        dispatch('changeView', { view: 'rooms' });
        resolve()
      })
    },
    fetchRooms({ commit, state, getters }) {
      return new Promise((resolve, reject) => {
        api.fetchRooms(
          rooms => {
            commit('setRooms', { rooms });
            
            if (state.activeRoomId) {
              commit('setMessagesAsRead', {
                userId: getters.userId,
                roomId: state.activeRoomId
              });
            }
            resolve();
          },
          error => {
            reject(error);
          }
        )
      })
    },
    createRoom ({ commit, dispatch }, payload ) {
      return new Promise(( resolve, reject ) => {
        api.createRoom(
          payload,
          room => {
            dispatch('changeRoom', { roomId: room._id });
            commit('appendRoomToList', { room });
            resolve(room);
          },
          error => {
            reject(error);
          }
        )
      })
    },
    markAsRead ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        api.markAsRead(
          payload,
          () => {
            commit('setMessagesAsRead', {
              userId: getters.userId,
              ...payload
            });
            resolve();
          },
          error => {
            reject(error);
          }
        )
      });
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