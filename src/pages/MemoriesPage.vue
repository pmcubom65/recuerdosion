<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title >Recordatorios con Foto</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Header without a border -->

    <ion-content>
      <ion-text class="ion-text-center"><h2>Crear un recuerdo</h2></ion-text>

      <ion-textarea
        placeholder="Añada texto del recordatorio..."
        auto-grow="true"
        autocapitalize
        autofocus="true"
        cols="4"
        rows="4"
        v-model="recuerdo"
        class="ion-text-center"
      >
      </ion-textarea>

      <ion-button
        color="primary"
        size="large"
        expand="block"
        shape="round"
        class="ion-text-center"
        :disabled="mif"
        @click="abrecamara"
        >Hacer Foto</ion-button
      >

      <ion-img :src="mifoto"></ion-img>

      <ion-button
        color="primary"
        size="large"
        expand="block"
        shape="round"
        class="ion-text-center"
        :disabled="mid"
        @click="mandaaviso"
        >Confirmar</ion-button
      >
    </ion-content>
  </ion-page>
</template>
<script>
import { Camera } from "@ionic-native/camera";

import { LocalNotifications } from "@ionic-native/local-notifications";
import { AppPreferences } from "@ionic-native/app-preferences";

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonImg,
  IonHeader,
  IonPage,
  IonTitle,
  IonTextarea,
  IonToolbar,
} from "@ionic/vue";
export default {
  components: {
    IonBackButton,
    IonImg,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar,
  },
  name: "MemoriesPage",

  ionViewDidEnter() {
    console.log("entrada en memorias");

    var suite = AppPreferences.suite("suiteName");

    let that = this;

    suite.fetch(
      function (valor) {
        var mistring = JSON.parse(valor);

        that.contruirid(mistring.id);
      },
      function (err) {
        console.log("fail " + err);
      },
      "id"
    );
  },

  data() {
    return {
      recuerdo: "",
      mifoto: "https://dummyimage.com/300x100/FFFFFF/000000&text=Incluya+Foto",
      mid: true,
      idusuario: null,
    };
  },

  computed: {
    mif() {
      return this.recuerdo === "";
    },
  },

  methods: {
 

    contruirid: function (ideu) {
      this.idusuario = ideu;
    },

    abrecamara: function () {
      Camera.getPicture({
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
      })
        .then((data) => {
          let base64Image = "data:image/jpeg;base64," + data;
          this.mifoto = base64Image;
          this.mid = false;
        })
        .catch((e) => console.log("Error occurred while taking a picture", e));
    },

    mandaaviso: function () {

      var tzoffset = new Date().getTimezoneOffset();
      var miDate = new Date(Date.now() - tzoffset * 60 * 1000);
      var m = miDate
        .toISOString()
        .slice(0, 19)
        .replace(/-/g, "/")
        .replace("T", " ");

      var elcontenido = this.recuerdo;
      var elusuario = this.idusuario;


      let creomensaje = {
        contenido: elcontenido,
        dia: m,
        usuarioid: elusuario,
        chatid: "",
        idusuariorecepcion: "",
      };

      const responsemensaje = fetch(
        "https://sleepy-tor-49836.herokuapp.com/api/smartchat/crearmensaje",
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
          body: JSON.stringify(creomensaje), // body data type must match "Content-Type" header
        }
      );

      responsemensaje.then((body) => {
        body.text().then((datos) => {
          console.log("que ha llegado ooo" + datos);
          var mimensaje = JSON.parse(datos);

          this.guardararchivo(m, mimensaje.id);
        });
      });
    },

    guardararchivo: function (diag, idmensaje) {
      let datosaenviar = {
        ID: this.idusuario,
        IMAGEN: this.mifoto,
        EXTENSION: "JPEG",
        DIA: diag,
        MENSAJE_ID: idmensaje,
        EMISOR: this.idusuario,
        RECEPTOR: "",
      };

      const response = fetch(
        "https://sleepy-tor-49836.herokuapp.com/api/smartchat/almacenarrecuerdo",
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
          body: JSON.stringify(datosaenviar), // body data type must match "Content-Type" header
        }
      );

      response.then((body) => {
        body.text().then((datos) => {
          console.log(datos);

          setTimeout(() => this.$router.push({ path: "/" }), 1000);
        });
      });

      LocalNotifications.schedule({
        id: 1,
        text: "Has guardado tu aviso correctamente",
        sound: null,
        data: null,
        icon: "/assets/icon/icon.png",
      });
    },
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

.sc-ion-textarea-md-h {
  background: #e30052 !important;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 10px !important;
  color: white !important;

  padding-bottom: 3px !important;
  padding-left: 5px !important;
  padding-right: 5px !important;
  padding-top: 5px !important;
}
</style>