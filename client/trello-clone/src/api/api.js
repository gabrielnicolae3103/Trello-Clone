const API_URL = 'http://localhost:3000/boards'

async function getBoards() {
    return await fetch(`${API_URL}`)
                .then(response => response.json());
}

async function postBoard(data) {
    // Default options are marked with *
    const response = await fetch(API_URL, {
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

export default {getBoards, postBoard};