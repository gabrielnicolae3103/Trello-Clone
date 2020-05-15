<template>
	<div>
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
		showButton: 'inline-block',
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
</style>


