const API_URL = 'http://localhost:3000/'

async function getBoards() {
    return await fetch(`${API_URL}boards`)
                .then(response => response.json());
}

async function postBoard(data) {
  const response = await fetch(`${API_URL}boards`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
      //TODO add auth
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
      'Content-Type': 'application/json'
      //TODO add auth
    },
    body: JSON.stringify(newList)
  });
  return response.json();
}

async function getListsByBoardId(boardId) {
	console.log(boardId);
	return await fetch(`${API_URL}lists/board/${boardId}`)
							.then(response => response.json());
}

async function getCardsByListId(listId) {
	return await fetch(`${API_URL}cards/list/${listId}`)
							.then(response => response.json());
}

async function updateCard(card) {
  const response = await fetch(`${API_URL}cards/${card._id}`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
      //TODO add auth
    },
    body: JSON.stringify(card)
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
      'Content-Type': 'application/json'
      //TODO add auth
    },
    body: JSON.stringify(card)
  });
  return response.json();
}

export default {getBoards, postBoard, getListsByBoardId, addAnotherList, getCardsByListId,
                updateCard, postCard};