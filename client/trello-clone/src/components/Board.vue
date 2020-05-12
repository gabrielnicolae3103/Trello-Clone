
<template>
    <b-button variant="primary">Primary {{ $route.params.id }}</b-button>
</template>

<script>

import api from '../api/api';

export default {
	name: 'Board',
	data: () => ({
		lists: [],
	}),
	created: async function() {
        this.getLists();
	},
	methods: {
        getLists: async function() {
            await api.getListsByBoardId(this.$route.params.id)
                .then(data => this.lists = data)
                .then(console.log(this.lists));
        }
	}
}
</script>


