<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2 class="primary--text">Create a new Meetup</h2>

            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required=""
                            ></v-text-field>
                            
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                required=""
                            ></v-text-field>
                            
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                            <input 
                                type="file" 
                                hidden 
                                ref="fileInput" 
                                accept="image/*"
                                @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-img
                                :src="imageUrl"
                                max-height="300px"
                                width="100%"
                            ></v-img>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                name="content"
                                label="Content"
                                id="content"
                                v-model="content"
                                required=""
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h2>Choose Date & Time</h2>
                        </v-flex>
                    </v-layout>
                   <v-layout row class="mb-2"> 
                        <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker landscape="" v-model="date" :reactive="true"></v-date-picker>
                            <v-time-picker landscape="" v-model="time" :reactive="true" format="24hr"></v-time-picker>
                            
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                          
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn 
                                type="submit" 
                                class="primary" 
                                :disabled="!formIsValid"
                                >Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>

                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            title:'',
            location:'',
            imageUrl:'',
            content:'',
            date:new Date().toISOString().substr(0, 10),
            time:new Date(),
            image: null
        }
    },
    computed : {
        formIsValid () {
            return this.title != '' &&
                this.location != '' && 
                this.imageUrl != '' && 
                this.content != ''
        },
        submittableDateTime () {
            const date = new Date(this.date)
            if(typeof this.time === 'string') {
                let hours = this.time.match(/^(\d+)/) [1]
                const minutes = this.time.match(/:(\d+)/) [1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
            }
            return date
            
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== 'undefined'
        }
    },
    methods : {
        onCreateMeetup () {
            if (!this.formIsValid) {
                return
            }
            if (!this.image) {
                return
            }
            const data = {
                title: this.title,
                location: this.location,
                image: this.image,
                content: this.content,
                date: this.submittableDateTime,
            }
            this.$store.dispatch('createMeetup',data)
            this.$router.push('/meetups')
        },
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid image file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () =>{
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>
