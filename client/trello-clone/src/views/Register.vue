<template>
	<div class="login-form">
		<b-card-group deck>
				<b-card
				header="Register"
				header-tag="header"
				footer-tag="footer"
				>
					<b v-show="error" style="color:#bb0000;">Username already exists</b>
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
					<b-button @click="register()" variant="primary">Register</b-button>
				</b-card>
		</b-card-group>
	</div>
</template>

<script>
import auth from '../services/auth';

export default {
		name:'Register',
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
			register: async function() {
				this.error = false;
				try {
					let response = await auth.register(this.username, this.password);
					this.$router.push('/login');
					return response;
				} catch(err) {
					this.error = true;
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