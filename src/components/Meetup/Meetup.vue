<template>
    <v-container>
        <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular 
                class="primary--text"
                indeterminate=""
                :width="7"
                :value="70"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2 class="primary--text">{{meetup.title}}</h2>
                        <template v-if="userIsCreator">
                            <app-edit-meetup-details-dialog  :meetup="meetup">

                            </app-edit-meetup-details-dialog>
                        </template>
                    </v-card-title>
                    <v-img
                        contain
                        height="350px"
                        :src="meetup.imageUrl"
                    >
                    </v-img>
                    <v-card-text>
                        <div>{{meetup.date | date}} - {{meetup.location}}
                             <app-meetup-register-dialog
                                v-if="userIsAuthenticated && !userIsCreator"
                                :meetupId="meetup.id"></app-meetup-register-dialog>
                            
                        </div>
                        <div>
                            <app-edit-meetup-date-dialog 
                                :meetup="meetup" 
                                v-if="userIsCreator">
                            </app-edit-meetup-date-dialog>
                            <app-edit-meetup-time-dialog
                                :meetup="meetup"
                                v-if="userIsCreator"
                                >

                            </app-edit-meetup-time-dialog>
                        </div>
                        <div>
                            
                        </div>
                        <v-divider ></v-divider>
                        <div class="mt-3">{{meetup.content}}
                        </div>
                    </v-card-text>
                    
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    props: ['id'],
    computed: {
        meetup () {
            return this.$store.getters.loadedMeetup(this.id)
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== 'undefined'
        },
        userIsCreator () {
            if (!this.userIsAuthenticated) {
                return false
            }
            return this.$store.getters.user.id === this.meetup.creatorId
        },
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>
