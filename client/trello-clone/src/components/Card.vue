<template>
	<div>
		<b-button v-b-modal='currentCard._id'>{{currentCard.title}}</b-button>

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
			</b-modal>
	</div>
</template>

<script>

import api from '../api/api';

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
			await api.updateCard(this.currentCard)
							.then(data => this.currentCard = data);
		}
	}
}
</script>
