<template>
	<div>
		<div>
      <b-navbar class="board-nav-bar" toggleable="sm" type="dark" variant="primary">
        <b-navbar-nav>
					<!-- <b-navbar-item input class="transparent-input"
												:v-model="currentBoard.name"
												placeholder="Enter Board Name"></b-navbar-item> -->
					<b-navbar-brand>{{currentBoard.name}}</b-navbar-brand>
					<b-navbar-nav class="ml-auto">
						<div>
							<b-button class="edit-button" v-b-modal='boardId'>Edit</b-button>
							<b-button @click="deleteBoard()">Delete</b-button>
								<!-- The modal -->
								<b-modal :title='currentBoard.name' :id='boardId'
												:ok-disabled='!nameState'
												@ok="changeBoardName">
									<label for="name-input-live">Name:</label>
									<b-form-input
										id="name-input-live"
										v-model="currentBoard.name"
										:state="nameState"
										aria-describedby="input-live-help input-live-feedback"
										placeholder="Enter name"
										trim
									></b-form-input>
									<b-form-invalid-feedback id="input-live-feedback">
										Enter at least 3 letters
									</b-form-invalid-feedback>
								</b-modal>
						</div>
					</b-navbar-nav>
        </b-navbar-nav>
				
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        </b-collapse>
      </b-navbar>
    </div>
		<div class="lists">
			<draggable class="lists" v-model="lists" group="lists" @start="drag=true" @end="drag=false" @change="log">
				<List v-for="list in lists" :key="list._id" v-bind:list="list"></List>
			</draggable>
		
			<div v-if="newList" class="new-list">
				<b-button  @click="showNewListButton()" v-bind:style="{ display : showButton }" class="new-list-button" v-b-toggle.collapse-1 variant="primary">Add another list</b-button>
				<b-collapse id="collapse-1">
					<b-card class="mt-2">
						<p class="card-text">LIST</p>
						<b-form-input v-model="newList.name" placeholder="Enter the list's title"></b-form-input>
						<b-button @click="addAnotherList()" variant="primary">Add List</b-button>
						<b-button @click="showNewListButton()" v-b-toggle.collapse-1 variant="primary">X</b-button>
					</b-card>
				</b-collapse>
			</div>
		</div>
	</div>
</template>

<script>

import api from '../api/api';
import List from './List';
import draggable from 'vuedraggable';

export default {
	name: 'Board',
	data: () => ({
		lists: [],
		boardId: 0,
		newList: {
			name: '',
			boardId: 0
		},
		currentBoard: {
			_id: null,
			name: '',
			members: []
		},
		showButton: 'inline-block',
	}),
	computed: {
		nameState() {
			return this.currentBoard.name.length > 2 ? true : false
		}
	},
	created: async function() {
				this.boardId = this.$route.params.id;
				this.newList.boardId = this.boardId;
				this.getLists();
				this.getCurrentBoard();
	},
	methods: {
        getLists: async function() {
            await api.getListsByBoardId(this.boardId)
                .then(data => this.lists = data)
                .then(() => console.log(JSON.parse(JSON.stringify(this.lists))));
				},
				addAnotherList: async function() {
					await api.addAnotherList(this.newList)
										.then(data => console.log(data))
										.then(this.getLists); //refresh lists
					this.newList.name = '';
				},
				showNewListButton: function() {
					if(this.showButton === 'inline-block')
						this.showButton = 'none'
					else
						this.showButton = 'inline-block'
					console.log('se apeleaza');
					return this.showButton;
				},
				log: function(evt) {
					console.log(evt);
				},
				getCurrentBoard: async function() {
					await api.getBoardById(this.boardId)
								.then(data => this.currentBoard = data)
								.then(console.log(this.currentBoard));
				},
				changeBoardName: async function() {
					return await api.updateBoard({
						name: this.currentBoard.name,
						_id: this.boardId})
						.then(this.getCurrentBoard);
				},
				deleteBoard: async function() {
					let response = await api.deleteBoard(this.boardId)
					this.$router.push("/boards");
					return response;
				}
		},
	components: {
		List,
		draggable
	}
}
</script>


<style scoped>
	.new-list {
		width: 300px;
	}
	.new-list-button {
		background-color: #4CAF50; /* Green */
		border: none;
		color: white;
		width: 300px;
		text-align: center;
		text-decoration: none;
		display: flex;
	}
	.lists {
		display: flex;
	}
	.mt-2 {
		width: 300px;
		display: flex;
	}
	.board-nav-bar {
		height: 50px;
	}
	.transparent-input {
		background: transparent;
		border: none;
	}
</style>


