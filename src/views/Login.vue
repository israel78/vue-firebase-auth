<template>
  <h1 class="my-5">Login de usuario</h1>
  <form @submit.prevent="procesarFormulario">
    <input
        type="email"
        placeholder="email"
        class="form-control my-2"
        v-model.trim="email"
    >
    <input
        type="password"
        placeholder="password"
        class="form-control my-2"
        v-model.trim="pass1"
    >

    <button
        type="submit"
        class="btn btn-primary"
        :disabled="bloquear"
    >Login</button>
  </form>
</template>
<script>
import {mapActions} from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: '',
      pass1: '',
    }
  },
  computed: {
    bloquear() {
      if (this.email.trim() === "")
        return true;
      if (!this.email.includes("@"))
        return true;
      return this.pass1.length < 6;

    }

  },
  methods:{
    ...mapActions(['loginUsuario']),
    procesarFormulario(){
      this.loginUsuario({email:this.email,password:this.pass1})
      this.email=''
      this.pass1='123456'
    }
  }
}
</script>
