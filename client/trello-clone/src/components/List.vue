<template>
    <div>
		<b-card class="list">
			<div v-if="currentList" class="currentList">
				<b-button  @click="showInputTitle()"
									v-bind:style="{ display : showButton }"
									class="input-title"
									v-b-toggle="currentList._id"
									variant="primary">{{currentList.name}}</b-button>
				<b-button @click="deleteList()" class="delete" variant="primary">DELETE LIST</b-button>
				<b-collapse :id="currentList._id">
					<b-form-input v-model="currentList.name" placeholder="Enter the list's title"></b-form-input>
					<b-button @click="updateList()" variant="primary">Update List Title</b-button>
					<b-button @click="showInputTitle()" v-b-toggle="currentList._id" variant="primary">X</b-button>
				</b-collapse>
			</div>
			<div class="cards">
				<b-list-group>
					<draggable v-model="cards" group="cards" @start="drag=true" @end="drag=false" @change="log">
						<Card class="card" v-for="card in cards" :key="card._id" v-bind:card="card"/>
					</draggable>
					<b-button class="new-card-button" v-b-modal='list._id' @click="showModal = true">Create new card</b-button>

					<!-- The modal -->
					<b-modal :title='list.title' :id='list._id'
									:ok-disabled='!titleState || !descriptionState'
									@ok="createNewCard">
						<label for="title-input-live">Title:</label>
						<b-form-input
							id="title-input-live"
							v-model="newCard.title"
							:state="titleState"
							aria-describedby="input-live-help input-live-feedback"
							placeholder="Enter title"
							trim
						></b-form-input>
						<label for="description-input-live">Description:</label>
						<b-form-input
							id="description-input-live"
							v-model="newCard.description"
							:state="descriptionState"
							aria-describedby="input-live-help input-live-feedback"
							placeholder="Enter description"
							trim
						></b-form-input>
						<b-form-invalid-feedback id="input-live-feedback">
							Enter at least 3 letters
						</b-form-invalid-feedback>
					</b-modal>
				</b-list-group>
			</div>	
		</b-card>
    </div>
</template>

<script>
import Card from './Card';
import lists_service from '../services/lists';
import cards_service from '../services/cards';
import draggable from 'vuedraggable';

export default {
    name: 'List',
		props: ['list'],
		data: () => ({
			cards: [],
			newCard: {
				title : '',
				description: '',
				listId: null
			},
			showModal: true,
			currentList: {
				name: '',
				_id: null,
			},
			showButton: 'inline-block',
	}),
    components: {
				Card,
				draggable
    },
    created: async function() {
				this.getCards();
				this.newCard.listId = this.list._id;
				this.currentList._id = this.list._id;
				this.currentList.name = this.list.name;
		},
		methods: {
			getCards: async function() {
				await cards_service.getCardsByListId(this.list._id)
					.then(data => this.cards = data);
			},
			createNewCard: async function() {
				await cards_service.postCard(this.newCard);
				this.newCard.title = '';
				this.newCard.description = '';
				this.getCards();
				this.showModal = false;
			},
			updateCard: async function(card) {
				await cards_service.updateCard(card)
			},
			updateList: async function() {
				await lists_service.updateList(this.currentList)
			},
			log: function(evt) {
				if (evt.added !== undefined) {
					// if we moved a card from another list to this list
					const movedCard = {
						_id: evt.added.element._id,
						listId: this.list._id,
					}
					this.updateCard(movedCard);
				}
			},
			deleteList: async function() {
				await lists_service.deleteList(this.currentList);
			},
			showInputTitle: function() {
				if(this.showButton === 'inline-block')
					this.showButton = 'none'
				else
					this.showButton = 'inline-block'
				return this.showButton;
			},
		},
		computed: {
			titleState() {
				return this.newCard.title.length > 2 ? true : false
			},
			descriptionState() {
				return this.newCard.description.length > 2 ? true : false
			}
		}
}
</script>

<style scoped>
.cards {
	display: flex;
	justify-content: space-between;
}
.card {
	column-gap: 40px;
}
.list {
	width: 300px;
}
.new-card-button {
	width: 250px;
}
.input-title {
	background: transparent;
	color: black;
	position: relative;
	left: -5px;
	width: 120px;
}
.delete {
	position: relative;
	right: 2px;
	width: 127px;
}
</style>