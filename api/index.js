const api = {};
// const serverSrc="http://192.168.252.13:3000/api/v1/";
const serverSrc="http://localhost:3000/api/v1/";
const rootServer = 'http://localhost:3000';
// const rootServer="https://diamwill-api.herokuapp.com/api/v1/";

api.serverSrc = rootServer;
// const serverSrc="https://diamwill-api.herokuapp.com/api/v1/";
api.sendMessage = function ({message, roomId}, success, failure) {
  const token = window.localStorage.getItem('token');
  fetch(`${serverSrc}inbox/room/${roomId}/message`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
      'token': token
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw {error: 500}
    }
  }).then(message => {
    success(message)
  }).catch(err => {
    failure(err);
  })
}

api.createRoom = function ({ message }, success, failure) {
  const token = window.localStorage.getItem('token');
  fetch(`${serverSrc}inbox/room`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
      'token': token
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw {error: 500}
    }
  }).then(room => {
    success(room)
  }).catch(err => {
    failure(err);
  })
}

api.markAsRead = function ({ roomId }, success, failure) {
  const token = window.localStorage.getItem('token');
  fetch(`${serverSrc}inbox/room/${roomId}/read`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    }
  }).then(res => {
    if (res.ok) {
      return success();
    } else {
      throw {error: 500}
    }
  }).catch(err => {
    failure(err);
  })
}

api.fetchRooms = function (success, failure) {
  const token = window.localStorage.getItem('token');
  fetch(`${serverSrc}inbox/room`, {
    method: 'GET',
    headers: {
      token: token
    }
  }).then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw {error: 500};
    }
  }).then(rooms => {
    success(rooms);
  }).catch(error => {
    failure(error);
  })
}