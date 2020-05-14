<template>
	<div class="login-form">
		<b-card-group deck>
				<b-card
				header="Login"
				header-tag="header"
				footer-tag="footer"
				>
					<b v-show="error" style="color:#bb0000;">Wrong credentials</b>
					<b-form-input v-model="username"
												placeholder="Enter the username"
												:state="usernameState"
												aria-describedby="input-live-help input-live-feedback"></b-form-input>
					<b-form-input v-model="password"
												type="password"
												placeholder="Enter the password"
												:state="passwordState"
												aria-describedby="input-live-help input-live-feedback"></b-form-input>
					<b-form-invalid-feedback id="input-live-feedback">
						Enter at least 1 letter
					</b-form-invalid-feedback>
					<b-button @click="login()" variant="primary">Login</b-button>
				</b-card>
		</b-card-group>
	</div>
</template>

<script>
import auth from '../services/auth';

export default {
    name:'Login',
    data: () => ({
        username: '',
				password: '',
				error: false,
		}),
		computed: {
			usernameState() {
				return this.username.length > 0 ? true : false
			},
			passwordState() {
				return this.password.length > 0 ? true : false
			}
		},
		methods: {
			login: async function() {
				this.error = false;
				try {
					let response = await auth.login(this.username, this.password);
					this.$router.push('/boards');
					return response;
				} catch(err) {
					console.log('err' + err);
				}							
			}
		}
}
</script>

<style scoped>
.login-form{
	width: 400px;
	display: flex;
	margin: auto;
}
</style>