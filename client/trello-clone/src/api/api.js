const API_URL = 'http://localhost:3000/boards'

async function getBoards() {
    return await fetch(`${API_URL}`)
                .then(response => response.json());
}

export default {getBoards};