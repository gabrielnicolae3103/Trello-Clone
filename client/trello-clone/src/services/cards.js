const API_URL = 'http://localhost:3000/'

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

export default {
  getCardsByListId,
  updateCard,
  postCard
};