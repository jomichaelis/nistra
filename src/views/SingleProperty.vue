<template>
  <v-container class="ma-4">
    <v-row>
      <v-avatar size="48">
        <v-img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        />
      </v-avatar>
      <v-card>
        <v-card-title>
          <h1 class="text-h4 font-weight-bold">{{ $route.params.property }}</h1>
        </v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import {
    signInWithPopup,
    GoogleAuthProvider
  } from 'firebase/auth'
  import { useFirebaseAuth } from 'vuefire'

  const auth = useFirebaseAuth()
  const router = useRouter()
  const route = useRoute()

  const provider = new GoogleAuthProvider();

  const logIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      router.push(route.query.redirect || '/')
    })
  }
</script>
