<template>
  <div class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">
          Formularios
      </router-link>
      <div class="d-flex">
          <router-link class="btn btn-dark" to="/"
          v-if="usuarioAutenticado">
            Tareas
          </router-link>
          <!--el boton aparece cuando no existe usuario de sesion con v-if-->
          <router-link class="btn btn-dark" to="/login"
                       v-if="!usuarioAutenticado">
            Login
          </router-link>

            <router-link class="btn btn-dark" to="/registro"
                         v-if="!usuarioAutenticado">
            Registrar
          </router-link>
        <button
            class="btn btn-dark"
            @click="finalizarSesion"
            v-if="usuarioAutenticado">
          Cerrar Sesión
        </button>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";

export default {
computed:{
  ...mapGetters(['usuarioAutenticado'])
}
, methods: {
    ...mapActions(['cerrarSesion']),
    finalizarSesion() {
      this.cerrarSesion()

    }
  },
}
</script>

