<template>
    <v-dialog
        scrollable 
        v-model="editDialog"
        max-width="500"
        transition="dialog-transition"
        persistent=""
    >   
        <v-btn flat slot="activator" class="blue--text ml-2">
            <v-icon>edit</v-icon>
            Edit
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title primary-title>
                            Edit Meetup
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title primary-title>
                            <v-card-text>
                                <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                required
                                v-model="editedTitle"
                            ></v-text-field>
                             <v-textarea
                                name="content"
                                label="Content"
                                id="content"
                                required=""
                                v-model="editedContent"
                            ></v-textarea>
                            </v-card-text>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat class="red--text darken-1" 
                                @click="editDialog = false">
                                Close</v-btn>
                            <v-btn flat class="green--text darken-1" 
                                @click="onSaveChanges">
                                Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
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
            editedTitle: this.meetup.title,
            editedContent: this.meetup.content
        }
    },
    methods: {
        onSaveChanges () {
            if (this.editedTitle.trim() === '' || this.editedContent.trim() === '') {
                return
            }
            this.editDialog = false
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editedTitle,
                content: this.editedContent
            })
        }
    }
}
</script>
