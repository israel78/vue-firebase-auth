import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
    user:null
  },
  mutations: {
    loginUser(state,payload){
      this.state.user = payload
    },
    setUser(state,payload){
      this.state.user = payload
    },
    cargar(state,payload){
      this.state.tareas = payload
    },
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    }
  },
  actions: {

    async loginUsuario({commit},user){
      try{
        const apiKey = 'AIzaSyBqkwFxGxqe4cP1W9Y8-sxJhzCjJ4yCvEs'
        //Si en Firebase le pasamos un ID como identificador en párametro (si no lo genera solo) y POST como tipo de llamada.
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            email:user.email,
            password:user.password,
            returnSecureToken:true
          })
        })
        const dataDB = await res.json();
        console.log(dataDB)
        if (dataDB.error){
          console.log(dataDB.error)
          return
        }
        commit('setUser',dataDB)
        router.push("/")
      }catch (e) {
        console.log(e)
      }
    },
   async registrarUsuario({commit},user){
     try{
       const apiKey = 'AIzaSyBqkwFxGxqe4cP1W9Y8-sxJhzCjJ4yCvEs'
       //Si en Firebase le pasamos un ID como identificador en párametro (si no lo genera solo) y POST como tipo de llamada.
       const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,{
         method: 'POST',
         headers:{
           'Content-Type':'application/json'
         },
         body: JSON.stringify({
           email:user.email,
           password:user.password,
           returnSecureToken:true
         })
       })
       const dataDB = await res.json();
       console.log(dataDB)
       if (dataDB.error){
         console.log(dataDB.error)
         return
       }
       commit('setUser',user)
     }catch (e) {
       console.log(e)
     }
    },
    async cargarDatosFirebase({commit,state}){
      try{
        const res = await fetch(`https://udemy-api-31a48-default-rtdb.europe-west1.firebasedatabase.app/tareas//${state.user.localId}.json?auth=${state.user.idToken}`,{
          method: 'GET',
          headers:{
            'Content-Type':'application/json'
          },
        })
        const dataDB = await res.json();
        console.log(dataDB)
        const arrayTareas = []
        for (let id in dataDB) {
          arrayTareas.push(dataDB[id])
        }
        commit('cargar', arrayTareas)
      }catch (e) {
        console.log(e);
      }


    },
    //Se hace necesario colocar async para poder utilizarla en la llamada al api de Firebase e implementar
    //El await que hace que la llamada sea sincrona
    async setTareas({ commit ,state}, tarea) {
      try{
        //Si en Firebase le pasamos un ID como identificador en párametro (si no lo genera solo) y POST como tipo de llamada.
        const res = await fetch(`https://udemy-api-31a48-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,{
          method: 'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json();
        console.log(dataDB)

      }catch (e) {
        console.log(e)
      }
      commit('set', tarea)
    },
    async deleteTareas({ commit ,state}, id) {
      try{
        //Si en Firebase le pasamos un ID como identificador en párametro (si no lo genera solo) y POST como tipo de llamada.
        const res = await fetch(`https://udemy-api-31a48-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,{
          method: 'DELETE',
          headers:{
            'Content-Type':'application/json'
          },
        })
        const dataDB = await res.json();
        console.log(dataDB)

      }catch (e) {
        console.log(e)
      }
      commit('eliminar', id)
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
   async updateTarea({ commit ,state}, tarea) {
     try{
       //Si en Firebase le pasamos un ID como identificador en párametro (si no lo genera solo) y POST como tipo de llamada.
       //Para editar, se usa path (ver documentación de firebase)
       const res = await fetch(`https://udemy-api-31a48-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,{
         method: 'PATCH',
         mode:'cors',
         headers:{
           'Content-Type':'application/json'
         },
         body: JSON.stringify(tarea)
       })
       const dataDB = await res.json();
       console.log(dataDB)

     }catch (e) {
       console.log(e)
     }
      commit('update', tarea)
    }
  },
  modules: {
  }
})
