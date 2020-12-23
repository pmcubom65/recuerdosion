<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons >
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>My Navigation Bar</ion-title>
    </ion-toolbar>

    <ion-toolbar>
      <ion-title>Subheader</ion-title>
    </ion-toolbar>
  </ion-header>

  <!-- Header without a border -->
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title>Header - No Border</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">My Navigation Bar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-title>Estas son mis memorias</ion-title>
<ion-button color="primary" @click="abrecamara">Primary</ion-button>


{{test}}


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
  IonToolbar
} from '@ionic/vue';
export default {
    components : {
          IonBackButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonPage,
  IonTitle, 
  IonToolbar
    },
    name : 'MemoriesPage',

    data() {
      return {
        test: null
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