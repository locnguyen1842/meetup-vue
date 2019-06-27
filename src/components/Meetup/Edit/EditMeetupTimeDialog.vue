<template>
    <v-dialog
        scrollable 
        v-model="editDialog"
        max-width="500"
        transition="dialog-transition"
        persistent=""
    >   
        <v-btn flat="" small slot="activator" class="blue--text">
            <v-icon>access_time</v-icon>
            edit
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title primary-title>
                            Edit Meetup Time
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                       <v-time-picker landscape="" v-model="editableTime" :reactive="true" format="24hr">
                           <template>
                               <v-spacer></v-spacer>
                                <v-btn class="red--text darken-1"
                                    flat=""
                                    @click="editDialog = false"
                                    >Close</v-btn>
                                <v-btn class="green--text darken-1"
                                    flat=""
                                    @click="onSaveChanges"
                                    >Save</v-btn>
                           </template>
                       </v-time-picker>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['meetup'],
    data() {
        return {
            editDialog: false,
            editableTime: null,
        }
    },
    methods: {
        onSaveChanges () {
            const newDate = new Date(this.meetup.date)
            const hours = this.editableTime.match(/^(\d+)/) [1]
            const minutes = this.editableTime.match(/:(\d+)/) [1]
            newDate.setHours(hours)
            newDate.setMinutes(minutes)
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                date: newDate
            })
        }
    },
    created () {
        let date = new Date(this.meetup.date)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        this.editableTime = hours + ":" + minutes
        console.log(this.editableTime);
        
        
    }
}
</script>
