<template>
    <v-container>
        <v-layout row wrap v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form @submit.prevent="onSignin">
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="email"
                                            label="Email"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            required=""
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            required=""
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-btn
                                            type="submit" 
                                            color="primary"
                                            class="ml-0"
                                            :disabled="loading" 
                                            :loading="loading"
                                            block=""
                                            >Sign in
                                            <template v-slot:loader>
                                                <span>Loading...</span>
                                            </template>
                                            
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                            <v-divider class="mb-3 mt-3"></v-divider>
                            <h2 class="text-xs-center">Login with Social Media</h2>
                            <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-btn
                                            @click="onSigninWithGoogle"
                                            class="white--text"
                                            color="red"
                                            :disabled="loading" 
                                            :loading="loading"
                                            block=""
                                            >
                                            Sign in with Google
                                            <template v-slot:loader>
                                                <span>Loading...</span>
                                            </template>
                                            
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-btn
                                            @click="onSigninWithFacebook"
                                            class="white--text"
                                            color="blue"
                                            :disabled="loading" 
                                            :loading="loading"
                                            block=""
                                            
                                            >
                                            Sign in with Facebook
                                            
                                            <template v-slot:loader>
                                                <span>Loading...</span>
                                            </template>
                                            
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            email: '',
            password: '',

        }
    },
    computed: {
        user () {
            return this.$store.getters.user
        },
        error () {
            return this.$store.getters.error
        },
        loading () {
            return this.$store.getters.loading            
        }
    },
    watch: {
        user (value) {
            if(value != null && value !== undefined) {
                this.$router.push('/') 
            }
        } 
    },
    methods: {
        onSignin () {
            //Vuex 
            this.$store.dispatch('signUserIn',{email: this.email, password: this.password})            
        },
        onDismissed () {
            this.$store.dispatch('clearError')
            
        },
        onSigninWithGoogle () {
            this.$store.dispatch('signUserInWithGoogleAccount')
        },
        onSigninWithFacebook () {
            this.$store.dispatch('signUserInWithFacebookAccount')
        }

    }
}
</script>
