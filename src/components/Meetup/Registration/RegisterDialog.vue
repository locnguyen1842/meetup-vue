<template>
    
        <v-btn @click="onAgree" accent slot="activator" v-if="userIsRegistered" class="dark--text" color="secondary">
            Registered
        </v-btn>
        <v-btn @click="onAgree" accent slot="activator" v-else class="white--text" color="primary">
            Register
        </v-btn>
        
</template>
<script>
export default {
    props: ['meetupId'],
    computed: {
        userIsRegistered () {
            return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                return meetupId == this.meetupId
            }) >= 0
        }
    },
    methods: {
        onAgree () {
            if (this.userIsRegistered) {
                this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
            } else {
                this.$store.dispatch('registerUserForMeetup', this.meetupId)
            }
        }
    }
}
</script>
