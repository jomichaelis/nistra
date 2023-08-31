<template>
  <v-app id="inspire">
    <v-app-bar elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="font-nistra">nistra</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
    >
      <v-list nav :lines="false">
        <v-list-item to="/" color="primary">
          <template v-slot:prepend>
            <v-icon>mdi-view-dashboard</v-icon>
          </template>
          <v-list-item-title>
            Dashboard
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in navProperties"
          :key="i"
          :to="item.link"
          color="primary"
        >
          <template v-slot:prepend>
            <v-avatar rounded="0" size="28px">
              <v-img :src="item.imageURL" />
            </v-avatar>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider />
        <v-list-item lines="two">
          <template v-slot:prepend>
            <v-avatar size="26px" :image="user.photoURL" />
          </template>
          <v-list-item-title v-text="user.displayName" />
          <v-list-item-subtitle v-text="user.email" />
          <template v-slot:append>
            <v-btn icon="mdi-logout" variant="text" color="blue-lighten-3" @click="logOut()"/>
          </template>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCurrentUser, useFirebaseAuth } from 'vuefire'
  import { signOut } from 'firebase/auth'

  const auth = useFirebaseAuth()
  const router = useRouter()
  const user = useCurrentUser()

  const drawer = ref(true)

  const logOut = () => {
    signOut(auth).then(() => {
      router.push('/login')
    })
  }
</script>

<script>
  import IconKirche from '@/assets/kirche_icon.jpg'
  import IconPfadfinder from '@/assets/pfadfinder_icon.png'
  export default {
    data: () => ({
      drawer: true,
      navProperties: [
        {
          title: 'Personal',
          imageURL: 'https://firebasestorage.googleapis.com/v0/b/jm-dashboard-812ca.appspot.com/o/icons%2Fjomichaelis_logo_tiny.png?alt=media&token=0484fb7f-2a48-420e-95b2-d2c89b5306e7',
          link: '/property/personal'
        },
        {
          title: 'Musikverein',
          imageURL: 'https://firebasestorage.googleapis.com/v0/b/jm-dashboard-812ca.appspot.com/o/icons%2Fmvm_logo.png?alt=media&token=13b02015-8967-431a-8d5f-ee3aa05ac78f',
          link: '/property/musikverein'
        },
        {
          title: 'Kirche',
          imageURL: IconKirche,
          link: '/property/kirche'
        },
        {
          title: 'Pfadfinder',
          imageURL: IconPfadfinder,
          link: '/property/pfadfinder'
        },
      ]
    }),
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Borel&display=swap');

.font-nistra {
  font-family: 'Borel', serif;
  div {
    font-size: 24px;
    margin-bottom: -8px;
    padding-top: 6px;
  }
}
</style>
