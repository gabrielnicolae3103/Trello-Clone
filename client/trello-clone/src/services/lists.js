const API_URL = 'http://localhost:3000/'

async function getListsByBoardId(boardId) {
	return await fetch(`${API_URL}lists/board/${boardId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
							.then(response => response.json());
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

export default {
    updateList,
    getListsByBoardId,
    deleteList,
    addAnotherList,
}