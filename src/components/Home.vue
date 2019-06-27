<template>
  <v-container>
    <v-layout row wrap justify-center class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="primary">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
          indeterminate=""
          :width="7"
          :value="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel hide-controls="" style="cursor:pointer" dark>
          <v-carousel-item v-for="meetup in meetups" v-bind:src="meetup.imageUrl" :key="meetup.id" @click="onLoadMeetup(meetup.id)">
            <v-container fill-height fluid>
              <v-layout align-start="" fill-height="">
                <v-flex class="text-xs-center text-sm-center">
                  <div class="title">
                    <span class="display-3 white--text">{{ meetup.title }}</span>
                    <br>
                    <span class="subheading white--text">{{ meetup.content }}</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
      meetups () {
          return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
  },
  methods: {
      onLoadMeetup(id){
          this.$router.push('/meetups/' + id)
      }
  }
};
</script>

<style scoped>
    .title{
        background-color: rgba(0,0,0,0.3);
        color: white;
        padding: 20px;
    }

</style>

