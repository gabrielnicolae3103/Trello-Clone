<template>
	<div>
		<b-button v-b-modal="cardTitle">Show Modal</b-button>

			<!-- The modal -->
			<b-modal :id='cardTitle'>{{card.description}}{{card.title}}</b-modal>
	</div>
</template>

<script>
export default {
	name: 'Card',
	props: ['card'],
	data: () => ({
		cardTitle: ''
	}),
	created: function() {
		this.cardTitle = this.card.title;
	}

}
</script>