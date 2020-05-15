<template>
	<div>
		<b-button class="card-button" v-b-modal='currentCard._id'>{{currentCard.title}}</b-button>

			<!-- The modal -->
			<b-modal :title='currentCard.title' :id='currentCard._id'
							:ok-disabled='!titleState || !descriptionState'
							@ok="submitCard">
				<label for="title-input-live">Title:</label>
				<b-form-input
					id="title-input-live"
					v-model="currentCard.title"
					:state="titleState"
					aria-describedby="input-live-help input-live-feedback"
					placeholder="Enter title"
					trim
				></b-form-input>
				<label for="description-input-live">Description:</label>
				<b-form-input
					id="description-input-live"
					v-model="currentCard.description"
					:state="descriptionState"
					aria-describedby="input-live-help input-live-feedback"
					placeholder="Enter description"
					trim
				></b-form-input>
				<b-form-invalid-feedback id="input-live-feedback">
					Enter at least 3 letters
				</b-form-invalid-feedback>
				<b-button @click="deleteCard()" variant="primary">Delete</b-button>
			</b-modal>
	</div>
</template>

<script>

import cards_service from '../services/cards';

export default {
	name: 'Card',
	props: ['card'],
	data: () => ({
		currentCard: null,
	}),
	created: function() {
		this.currentCard = this.card;
	},
	computed: {
		titleState() {
			return this.currentCard.title.length > 2 ? true : false
		},
		descriptionState() {
			return this.currentCard.description.length > 2 ? true : false
		}
	},
	methods: {
		submitCard: async function() {
			await cards_service.updateCard(this.currentCard)
							.then(data => this.currentCard = data);
		},
		deleteCard: async function() {
			await cards_service.deleteCard(this.currentCard._id);
			//hide the modal
			this.$bvModal.hide(this.currentCard._id);
			//update list of cards
			this.$parent.$parent.getCards();
		}
	}
}
</script>

<style scoped>
.card-button {
	width: 250px;
}
</style>
