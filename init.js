const vueApp = new Vue({
  el: "#view-3.vueInbox",
  store
})

const socket = io(api.serverSrc);

socket.on('connect', function () {
  // Send socket authentication request using the token from the localStorage
  socket.emit('authentication', { token: activeMemberManager.token });

  socket.on('authenticated', function() {
    // Authenticated. We can now listen for actual events
    store.dispatch('fetchRooms');
    socket.on('new-message', () => {
      store.dispatch('fetchRooms')
    });
  });

  socket.on('unauthorized', function() {
    activeMainTool.hideWrapper();
    store.dispatch('setUnauthorized');
  });
});