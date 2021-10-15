<template>
  <div class="alert alert-danger" v-if="getError.tipo != null">
    {{getError.mensaje}}
  </div>
  <h1 class="my-5">Login de usuario</h1>
  <form @submit.prevent="procesarFormulario">
    <input
        type="email"
        placeholder="email"
        class="form-control my-2"
        v-model.trim="email"
        :class="[getError.tipo === 'email'?'is-invalid':'']"
    >
    <input
        type="password"
        placeholder="password"
        class="form-control my-2"
        v-model.trim="pass1"
        :class="[getError.tipo === 'password'?'is-invalid':'']"
    >

    <button
        type="submit"
        class="btn btn-primary"
        :disabled="bloquear"
    >Login</button>
  </form>
</template>
<script>
import {mapActions,mapGetters} from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: '',
      pass1: '',
    }
  },
  computed: {
    ...mapGetters(['getError']),
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
    async procesarFormulario(){
      await this.loginUsuario({email:this.email,password:this.pass1})
      if (this.getError.tipo!=null){
        return
      }
      this.email=''
      this.pass1=''
    }
  }
}
</script>
