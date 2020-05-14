<template>
	<div>
		<b-button @click="goToBoard(board)" v-for="(board, i) in boards" :key="i" href="#" variant="primary">{{board.name}}</b-button>
		<b-button v-b-modal.modal-1 @click="showModal = true">Create new board</b-button>

		<b-modal v-if="showModal" id="modal-1" title="Create new board">
			<input v-model="newBoard.name" placeholder="Name for the new card!">
			<b-button @click="createNewBoard()" variant="primary">Create Board</b-button>
		</b-modal>
	</div>
</template>

<script>

import api from '../api/api';
import jwt_decode from 'jwt-decode';

export default {
	name: 'Boards',
	data: () => ({
		count: 0,
		boards: [],
		newBoard: {
			name : ''
			//TODO add colour
			//TODO get current logged user and set it as member
		},
		showModal: true,
		user: '',
	}),
	created: function() {
		this.extractLoggedInUser();
		this.getBoards();
	},
	methods: {
		getBoards: async function() {
			await api.getBoardsByUsername(this.user)
					.then(data => this.boards = data);
			console.log(this.boards);
		},
		goToBoard: function(board) {
			console.log(board)
			this.$router.push(`/b/${board._id}`)
		},
		createNewBoard: async function() {
			await api.postBoard(this.newBoard)
					.then(data => console.log(data));
			this.newBoard = {};
			this.getBoards();
			this.showModal = false;
		},
		extractLoggedInUser: function() {
			this.user = jwt_decode(localStorage.getItem('jwt')).username;
		}
	}
}
</script>

