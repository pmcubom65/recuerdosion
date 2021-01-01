<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-button slot="end" @click="goback()"> X </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <img :src="foto" />
    <ion-button expand="block" @click="borrar()"
      >Borrar Recordatorio</ion-button
    >
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  modalController,
  toastController
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    title: { type: String, default: "" },
    foto: { type: String, default: "" },
    id: { type: String, default: "" },
  },

  methods: {
    goback: function () {
      modalController.dismiss();
    },

    borrar: function () {
      let datosr = {
        id: this.$props.id,
      };

      const borrado = fetch(
        "https://sleepy-tor-49837.herokuapp.com/api/smartchat/borrarrecuerdo",
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
          body: JSON.stringify(datosr), // body data type must match "Content-Type" header
        }
      );

      borrado.then((body) => {
        body.text().then((b) => {
          var mib = JSON.parse(b);
 
          modalController.dismiss(mib);
  
           this.alertar()
   
       
        });
      });
    },

          async alertar(){
              const toast = await toastController
        .create({
          message: 'Mensaje Borrado',
          duration: 2000
        })
       await toast.present();
  }
  },

  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButton },
});
</script>

<style scoped>
ion-button {
  font-size: 14pt;
}
</style>