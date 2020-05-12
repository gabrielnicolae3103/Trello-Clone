const API_URL = 'http://localhost:3000/'

async function getBoards() {
    return await fetch(`${API_URL}boards`)
                .then(response => response.json());
}

async function postBoard(data) {
  // Default options are marked with *
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

async function getListsByBoardId(boardId) {
	console.log(boardId);
	return await fetch(`${API_URL}lists/board/${boardId}`)
							.then(response => response.json());
}
export default {getBoards, postBoard, getListsByBoardId};