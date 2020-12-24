<template>
  <ion-page>
    <ion-toolbar>
      <ion-title class="ion-text-center">Recordatorios con Foto</ion-title>

      <ion-buttons start>
        <ion-menu-button autoHide="false"></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
    <micomponente></micomponente>

   {{test}}
  </ion-page>
</template>


<script>
import Micomponente from "../components/Micomponente.vue";
import { GooglePlus } from "@ionic-native/google-plus";

import { IonTitle } from "@ionic/vue";
import { IonPage } from "@ionic/vue";
//import { HTTP } from "@ionic-native/http";

export default {
  components: {
    Micomponente,
    IonTitle,
    IonPage,
  },
  data() {
    return {
      test: ''
    }
  },



  methods: {
    crearusuario: function (email) {
      let data = {
        telefono: email,
        nombre: email,
        token: email,
      };
  

    const response= fetch('https://sleepy-tor-49836.herokuapp.com/api/smartchat/crearusuario', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });


 response.then(body=> {
    console.log('id del usuario '+body.text().then((datos)=>{
      console.log(datos)

      this.$bus.$emit('id', datos.id)


    }));
    this.test=body;
    })




    },
  },

  ionViewDidEnter() {
    console.log("Home page did enter");

    GooglePlus.login({
      webClientId:
        "1057749725019-rq5bi47cri1mg4lloq354bj2trerbltr.apps.googleusercontent.com",
    })
      .then((res) => {
        console.log(res.email);
        this.crearusuario(res.email);
      })
      .catch((err) => console.error(err));
  },
  ionViewDidLeave() {
    console.log("Home page did leave");
  },
  ionViewWillEnter() {
    console.log("Home page will enter");
  },
  ionViewWillLeave() {
    console.log("Home page will leave");
  },
};
</script>
<style scoped>
ion-toolbar {
  --min-height: 100px;
  --padding-bottom: 5px;
}

ion-title {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 90px 1px;

    height: 100%;
    text-align: center;
}
</style>
