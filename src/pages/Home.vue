<template>
  <ion-page>
    <ion-toolbar>



           <ion-title class="ion-text-center">Recordatorios con Foto</ion-title>
             <ion-buttons end>
      <button @click="openStart()">
    <ion-icon name="menu"></ion-icon>
  </button>
 

  </ion-buttons>
    </ion-toolbar>
    <micomponente></micomponente>

    <ion-content fullscreen id="content">
       <ion-spinner v-if="hacargado" name="crescent" color="primary"></ion-spinner>
      <ion-card v-else-if="!hacargado && losrecuerdos.length===0">
   
           <ion-card-header>
          <ion-card-title>No tiene registrado ningún recordatorio aún</ion-card-title>
           </ion-card-header>
      </ion-card>


      <ion-card v-else v-for="item in losrecuerdos" :key="item.id" @click="openModal(item)">
        
        <ion-card-header>
          <div class="box">
            <div><img :src="item.ruta" /></div>
          <div class="conmargen">

          <ion-card-subtitle>{{ calculadia(item.dia) }}</ion-card-subtitle>
          <ion-card-title>{{ item.contenido }}</ion-card-title>

          </div>

          </div>

        </ion-card-header>
        <ion-card-content> </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>


<script>
import Micomponente from "../components/Micomponente.vue";
import { GooglePlus } from "@ionic-native/google-plus";

import { IonTitle,  IonSpinner , IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, modalController, IonIcon, menuController} from "@ionic/vue";
import { IonPage } from "@ionic/vue";
import { AppPreferences } from "@ionic-native/app-preferences";
import * as moment from "moment";

import Modal from '../components/Modal.vue'

//import { HTTP } from "@ionic-native/http";

export default {
  components: {
    Micomponente,
    IonTitle,
    IonPage,
    IonIcon,
     IonSpinner,
     IonCard, IonCardContent, IonCardSubtitle, IonCardTitle
  },
  data() {
    return {
      losrecuerdos: Array,
      hacargado: true
    };
  },

  methods: {

    openStart : function(){
      console.log('click click click')
 menuController.open("start");
    },

        async openModal (miitem) {
      const modal = await modalController
        .create({
          component: Modal,
  
          componentProps: {
            title: miitem.contenido,
            foto: miitem.ruta,
            id: miitem.id
            
          },
        })
      return modal.present();
    },







    calculadia: function (dia) {
      var midia = moment(dia);
      midia.locale("es");

      return midia.format("DD [de] MMMM [de] YYYY, HH:mm");
    },

    crearusuario: function (email) {
      let data = {
        telefono: email,
        nombre: email,
        token: email
      };

      const response = fetch(
        "https://sleepy-tor-49836.herokuapp.com/api/smartchat/crearusuario",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      );

      response.then((body) => {
        body.text().then((datos) => {
          console.log(datos);

          // AppPreferences.store(function(valor){console.log('ok '+valor.json())}, function(err){console.log('fail '+err.json())}, 'id', 'soycunao');

          var suite = AppPreferences.suite("suiteName");

          suite.store(
            function (valor) {
              console.log("ok " + valor);
            },
            function (err) {
              console.log("fail " + err);
            },
            "id",
            datos
          );

          var miusuario = JSON.parse(datos);

          this.dameRecuerdos(miusuario.id);
        });
      });
    },

    dameRecuerdos: function (idusuario) {
      let datosusuario = {
        id: idusuario,
      };

      const responserecuerdos = fetch(
        "https://sleepy-tor-49836.herokuapp.com/api/smartchat/damerecuerdos",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(datosusuario), // body data type must match "Content-Type" header
        }
      );

      responserecuerdos.then((body) => {
        body.text().then((recuerdos) => {
          var misrecuerdos = JSON.parse(recuerdos);
          this.hacargado=false;

          this.losrecuerdos = misrecuerdos.mensajes;
        });
      });
    },
  },

  ionModalDidDismiss() {
    console.log('dismiss')
  },

  ionViewDidEnter() {
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
  --min-height: 80px;
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

img {
  height: 100px;
  width: auto;
  margin: 0 auto;
}



.conmargen {
  margin-left: 1rem;
  margin-top: 1rem;
}

.box {
  display: flex;
}

ion-spinner {
    transform: scale(3);
    margin-top: 30%;
    margin-left: 50%;
}



.ion-md-menu{
	color: white !important;
}


</style>


