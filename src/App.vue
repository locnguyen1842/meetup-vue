<template>
  <v-app>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="sideNav =! sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link :to="{name: 'Home'}" tag="span" style="cursor:pointer">Meetups</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn 
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>

    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      
    };
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: "face", title: "Sign Up", link: "/signup" },
        { icon: "lock_open", title: "Sign In", link: "/signin" }
      ]
      if(this.userIsAuthenticated) {
        menuItems = [
          { icon: "supervisor_account", title: "View Meetups", link: "/meetups" },
          { icon: "room", title: "Organize Meetup", link: "/meetup/new" },
          { icon: "person", title: "Profile", link: "/profile" },
        ]
        
      }

      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user != null && this.$store.getters.user !== 'undefiend'
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
};
</script>