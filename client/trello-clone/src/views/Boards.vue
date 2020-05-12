<template>
	<div>
		<b-button @click="goToBoard(board)" v-for="(board, i) in boards" :key="i" href="#" variant="primary">{{board.name}}</b-button>
		<b-button @click="getBoards()" variant="primary">Test</b-button>
		<b-button v-b-modal.modal-1>Launch demo modal</b-button>

		<b-modal id="modal-1" title="New Card">
			<p class="my-4">Hello from modal! {{count}}</p>
		</b-modal>
	</div>
</template>

<script>

import api from '../api/api';

export default {
	name: 'Boards',
	data: () => ({
		count : 0,
		boards: []
	}),
	methods: {
		getBoards: async function() {
			await api.getBoards().then(data => this.boards = data);
			console.log(this.boards);
		},
		goToBoard: function(board) {
			console.log(board)
			this.$router.push(`/b/${board._id}`)
		}
	}
}
</script>

