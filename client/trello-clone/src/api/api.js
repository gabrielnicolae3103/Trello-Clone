const API_URL = 'http://localhost:3000/'

async function getBoards() {
    return await fetch(`${API_URL}boards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(response => response.json());
}

async function getBoardsByUsername(username) {
  return await fetch(`${API_URL}boards/username/${username}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
              .then(response => response.json());
}

async function getBoardById(boardId) {
  return await fetch(`${API_URL}boards/${boardId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
              .then(response => response.json());
}

async function postBoard(data) {
  const response = await fetch(`${API_URL}boards`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

async function addAnotherList(newList) {
  if (newList.name === '' || newList === null)
    return;
  const response = await fetch(`${API_URL}lists`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(newList)
  });
  return response.json();
}

async function getListsByBoardId(boardId) {
	console.log(boardId);
	return await fetch(`${API_URL}lists/board/${boardId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
							.then(response => response.json());
}

async function getCardsByListId(listId) {
	return await fetch(`${API_URL}cards/list/${listId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
							.then(response => response.json());
}

async function updateCard(card) {
  const response = await fetch(`${API_URL}cards/${card._id}`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(card)
  });
  return response.json();
}

async function updateBoard(card) {
  const response = await fetch(`${API_URL}boards/${card._id}`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(card)
  });
  return response.json();
}

async function deleteBoard(boardId) {
  const response = await fetch(`${API_URL}boards/${boardId}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  });
  return response.json();
}

async function updateList(list) {
  const response = await fetch(`${API_URL}lists/${list._id}`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(list)
  });
  return response.json();
}

async function deleteList(list) {
  const response = await fetch(`${API_URL}lists/${list._id}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(list)
  });
  return response.json();
}

async function postCard(card) {
  const response = await fetch(`${API_URL}cards/`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(card)
  });
  return response.json();
}

export default {getBoards, postBoard, getListsByBoardId, addAnotherList, getCardsByListId,
                updateCard, postCard, updateList, deleteList, getBoardsByUsername, getBoardById,
                updateBoard, deleteBoard};