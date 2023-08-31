<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <h1 class="text-h2 font-weight-bold">nistra</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-btn
            min-width="164"
            variant="outlined"
            @click.prevent="logIn()"
          >
            <v-icon
              icon="mdi-google"
              size="large"
              start
            />
            Sign in
          </v-btn>
      </v-row>
    </v-responsive>
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
