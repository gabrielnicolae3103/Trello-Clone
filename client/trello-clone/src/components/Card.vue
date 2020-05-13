<template>
	<div>
		<b-button v-b-modal='card._id'>Show Modal</b-button>

			<!-- The modal -->
			<b-modal :title='card.title' :id='card._id'>
				<label for="title-input-live">Title:</label>
				<b-form-input
					id="title-input-live"
					v-model="card.title"
					:state="titleState"
					aria-describedby="input-live-help input-live-feedback"
					placeholder="Enter title"
					trim
				></b-form-input>
				<label for="description-input-live">Description:</label>
				<b-form-input
					id="description-input-live"
					v-model="card.description"
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
export default {
	name: 'Card',
	props: ['card'],
	data: () => ({
	}),
	computed: {
		titleState() {
			return this.card.title.length > 2 ? true : false
		},
		descriptionState() {
			return this.card.description.length > 2 ? true : false
		}
	},
}
</script>
