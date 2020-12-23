<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons >
        <ion-back-button ></ion-back-button>
      </ion-buttons>
      <ion-title  class="ion-text-center">Recordatorios con Foto</ion-title>
    </ion-toolbar>

  </ion-header>

  <!-- Header without a border -->


  <ion-content>
 

    <ion-text  class="ion-text-center"><h1>Crear un recuerdo</h1></ion-text>


       <ion-textarea placeholder="Añada texto del recordatorio..." auto-grow="true" autocapitalize
       autofocus="true" cols="4" rows="4" v-model="recuerdo">

       </ion-textarea>



<ion-button color="primary" size="large" expand="block" shape="round"  class="ion-text-center" @click="abrecamara">Hacer Foto</ion-button>





  </ion-content>
</ion-page>
</template>
<script>
import { Camera } from '@ionic-native/camera';

import { LocalNotifications } from '@ionic-native/local-notifications';


import { 
  IonBackButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonPage,
  IonTitle, 
   IonTextarea ,
  IonToolbar
} from '@ionic/vue';
export default {
    components : {
          IonBackButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonPage,
   IonTextarea ,
  IonTitle, 
  IonToolbar
    },
    name : 'MemoriesPage',

    data() {
      return {
      recuerdo: ''
      }
    },
    
methods: {


    abrecamara: function() {
      /*const CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

/*    Camera.getPicture(CameraOptions).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 let base64Image = 'data:image/jpeg;base64,' + imageData;
 console.log(base64Image)
}, (err) => {
 console.log(err)
});*/
  Camera.getPicture({
    quality: 100,
    destinationType: Camera.DestinationType.DATA_URL,

  })
    .then(data => {
      console.log('Took a picture!', data);
      this.mandaaviso();
    })
    .catch(e => console.log('Error occurred while taking a picture', e));




    },



    mandaaviso: function() {
      LocalNotifications.schedule({
  id: 1,
  text: 'Has guardado tu aviso correctamente',
  sound: null,
  data: null,
    icon: '/assets/icon/icon.png'
});



    }




}

    
}





</script>

<style scoped>
ion-toolbar {
  --min-height: 100px;
  --padding-bottom: 5px;
}

ion-title {
    position: absolute;
    top: 0;
    left: 30;
    padding: 0 90px 1px;

    height: 100%;
    text-align: center;
}



.sc-ion-textarea-md-h {
 background: black !important;
 margin-left: 10px;
 margin-right: 10px;
 widows: 80%;
 margin-top: 30px;
 margin-bottom: 30px;
  border-radius: 10px !important;
  color: white !important;
  color: white !important;
  padding-bottom: 5px !important;
padding-left: 5px !important;
padding-right: 5px !important;
padding-top: 5px !important;



}
</style>