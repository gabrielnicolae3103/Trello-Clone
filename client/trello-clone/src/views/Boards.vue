<template>
	<div>
		<div>
			<h3 class="personal-boards">Personal Boards</h3>
		</div>
		<div class="boards-list">
			<b-button class="boards-list-item" @click="goToBoard(board)" v-for="(board, i) in boards" :key="i" href="#" variant="primary">{{board.name}}</b-button>
			<b-button class="boards-list-item" v-b-modal.modal-1 @click="showModal = true">Create new board</b-button>

			<b-modal v-if="showModal" id="modal-1" title="Create new board">
				<input v-model="newBoard.name" placeholder="Name for the new board!">
				<b-button @click="createNewBoard()" variant="primary">Create Board</b-button>
			</b-modal>
		</div>
	</div>
</template>

<script>

import boards_service from '../services/boards';
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
			await boards_service.getBoardsByUsername(this.user)
					.then(data => this.boards = data);
		},
		goToBoard: function(board) {
			this.$router.push(`/b/${board._id}`)
		},
		createNewBoard: async function() {
			await boards_service.postBoard(this.newBoard);
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

<style scoped>
.personal-boards {
    display: inline-block;
    line-height: 24px;
    margin: 4px 0 0;
    font-size: 16px;
    font-weight: 700;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.boards-list {
    display: flex;
    flex-wrap: wrap;
}
.boards-list-item {
    width: 14%;
    margin-right: 1%;
		margin-top: 1%;
		margin-left: 1%;
}
</style>

