<template>
    <v-dialog
        scrollable 
        v-model="editDialog"
        max-width="500"
        transition="dialog-transition"
        persistent=""
    >   
        <v-btn flat="" small="" accent slot="activator" class="blue--text">
            <v-icon >calendar_today</v-icon>
            Edit
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title primary-title>
                            Edit Meetup Date
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                       <v-date-picker width="100%" v-model="editableDate" :reactive="true">
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
                       </v-date-picker>
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
            editableDate: null,
        }
    },
    methods: {
        onSaveChanges () {
            const newDate = new Date(this.meetup.date)
            const newDay = new Date(this.editableDate).getUTCDate()
            const newMonth = new Date(this.editableDate).getUTCMonth()
            const newYear = new Date(this.editableDate).getUTCFullYear()
            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                date: newDate
            })
        }
    },
    created () {
        this.editableDate = new Date(this.meetup.date).toISOString().substr(0,10)
    }
}
</script>
