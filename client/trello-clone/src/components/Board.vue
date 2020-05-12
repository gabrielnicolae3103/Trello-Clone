<template>
	<div>
		<b-button variant="primary">Primary {{ boardId }}</b-button>
		<List v-for="list in lists" :key="list._id" v-bind:list="list"></List>
		
		<div v-if="newList" class="new-list">
			<b-button class="new-list-button" v-b-toggle.collapse-1 variant="primary">Add another list</b-button>
			<b-collapse id="collapse-1" class="mt-2">
				<b-card>
					<p class="card-text">LIST</p>
					<b-form-input v-model="newList.name" placeholder="Enter the list's title"></b-form-input>
					{{newList.name}}
					<b-button @click="addAnotherList()" variant="primary">Add List</b-button>
					<b-button v-b-toggle.collapse-1 variant="primary">X</b-button>
				</b-card>
			</b-collapse>
		</div>
	</div>
</template>

<script>

import api from '../api/api';
import List from './List';

export default {
	name: 'Board',
	data: () => ({
		lists: [],
		boardId: 0,
		newList: {
			name: '',
			boardId: 0
		},
	}),
	created: async function() {
				this.boardId = this.$route.params.id;
				this.newList.boardId = this.boardId;
        this.getLists();
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
				}
	},
	components: {
		List
	}
}
</script>


<style scoped>
	.new-list {
		max-width: 300px;
	}
	.new-list-button {
		background-color: #4CAF50; /* Green */
		border: none;
		color: white;
		width: 300px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
	}
</style>


