<template>
    <div>
			<b-card class="list" :title="list.name" sub-title="Card subtitle">
				<div class="cards">
					<b-list-group>
						<Card v-for="card in cards" :key="card._id" v-bind:card="card"/>
					</b-list-group>
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
.list {
	width: 300px;
}
</style>