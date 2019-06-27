<template>
    <v-container>
        <v-layout row wrap  v-for="meetup in meetups" :key="meetup.id" class="mb-3">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md-2>
                <v-card class="primary">
                    <v-container fluid>
                        <v-layout row wrap="">
                            <v-flex xs5 sm4 md3>
                                <v-img
                                    height="150px"
                                    :src="meetup.imageUrl"
                                    aspect-ratio="1" 
                                    contain
                                >
                                    
                                </v-img>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary>
                                    <div >

                                        <h2 class="white--text">{{meetup.title}}</h2>
                                        <div class="white--text">{{meetup.date | date}}</div>
                                        <div class="white--text">{{meetup.location}}</div>
                                        <div v-if="!userIsCreator(meetup.id)">
                                            <div v-bind:class="[!userIsRegistered(meetup.id) ? 'green--text': 'red--text']">
                                                {{ !userIsRegistered(meetup.id) ? 'Registered': 'Unregistered' }}
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="white--text">
                                                Your Meetup
                                            </div>
                                        </div>
                                    </div>
                                </v-card-title>
                                <v-card-actions style="float:right">
                                    <v-btn top="" dark="" flat :to="'/meetups/' + meetup.id">
                                        <v-icon left dark>arrow_forward</v-icon>    
                                        View Meetup
                                        
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    computed: {
        meetups () {
            return this.$store.getters.loadedMeetups
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== 'undefined'
        },
    },
    methods: {
        userIsRegistered (meetupId) {
            return this.$store.getters.user.registeredMeetups.findIndex(id => {
                return id == meetupId
            })
        },
        userIsCreator (meetupId) {
            if (!this.userIsAuthenticated) {
                return false
            }
            let meetup = this.$store.getters.loadedMeetup(meetupId)
            return this.$store.getters.user.id === meetup.creatorId
        }
    }

}
</script>
