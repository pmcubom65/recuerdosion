<template>
<ion-page>
  <ion-toolbar>
    <ion-title class="ion-text-center">Recordatorios con Foto</ion-title>

    <ion-buttons start>
      <ion-menu-button autoHide="false"></ion-menu-button>
    </ion-buttons>
  </ion-toolbar>
  <micomponente></micomponente>

  Soy muy cuñao
</ion-page>
</template>


<script>
import Micomponente from "../components/Micomponente.vue";
import { GooglePlus } from '@ionic-native/google-plus';

import { IonTitle } from "@ionic/vue";
import { IonPage } from '@ionic/vue';
import { HTTP } from '@ionic-native/http';


export default {
  components: {
    Micomponente,
    IonTitle,
     IonPage
  },
  methods: {

      crearusuario: function(email) {
HTTP.post('https://ionic.io', {
  email: email
}, {})
  .then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
        

      }
  },





  ionViewDidEnter() {
    console.log('Home page did enter');

    GooglePlus.login({
     
      'webClientId': '1057749725019-rq5bi47cri1mg4lloq354bj2trerbltr.apps.googleusercontent.com'
}).then(res => console.log(res)).catch(err => console.error(err));

  },
  ionViewDidLeave() {
    console.log('Home page did leave');
  },
  ionViewWillEnter() {
    console.log('Home page will enter');
  },
  ionViewWillLeave() {
    console.log('Home page will leave');
  }
};
</script>

