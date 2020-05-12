<template>
    <div>
        <b-card :title="list.name" sub-title="Card subtitle">
					<b-card-text></b-card-text>
					<div class="cards">
						<Card v-for="card in cards" :key="card._id" v-bind:card="card"></Card>
					</div>
			</b-card>
    </div>
</template>

<script>
import Card from './Card';
import api from '../api/api'

export default {
    name: 'List',
		props: ['list'],
		data: () => ({
			cards: [],
	}),
    components: {
        Card,
    },
    created: async function() {
				this.getCards();
		},
		methods: {
			getCards: async function() {
				await api.getCardsByListId(this.list._id)
					.then(data => this.cards = data)
					.then(() => console.log(JSON.parse(JSON.stringify(this.cards))));
				},
		}
}
</script>

<style scoped>
.cards {
	display: flex;
	justify-content: space-between;
}
</style>