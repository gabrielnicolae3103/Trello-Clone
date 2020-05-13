<template>
    <div>
			<b-card class="list" :title="list.name" sub-title="Card subtitle">
				<div class="cards">
					<b-list-group>
						<draggable v-model="cards" group="cards" @start="drag=true" @end="drag=false">
							<Card v-for="card in cards" :key="card._id" v-bind:card="card"/>
						</draggable>
						<b-button v-b-modal='list._id' @click="showModal = true">Create new card</b-button>

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
import api from '../api/api'
import draggable from 'vuedraggable'

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
	}),
    components: {
				Card,
				draggable
    },
    created: async function() {
				this.getCards();
				this.newCard.listId = this.list._id;
		},
		methods: {
			getCards: async function() {
				await api.getCardsByListId(this.list._id)
					.then(data => this.cards = data)
					.then(() => console.log(JSON.parse(JSON.stringify(this.cards))));
			},
			createNewCard: async function() {
				await api.postCard(this.newCard)
						.then(data => console.log(data));
				this.newCard.title = '';
				this.newCard.description = '';
				this.getCards();
				this.showModal = false;
			}
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
.list {
	width: 300px;
}
</style>