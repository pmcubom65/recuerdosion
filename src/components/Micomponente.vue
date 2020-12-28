<template>
 
  <ion-menu  side="start"  content-id="content" >
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content  >
        <ion-list>
            <ion-item>

  <img id="imagentitulo" src="assets/icon/icon.png">

            </ion-item>


    <ion-item>
          <ion-icon name="profile"></ion-icon>
      <ion-label>Mi Perfil</ion-label>
    </ion-item>
    <ion-item>
           <ion-icon name="add"></ion-icon>
      <ion-label><router-link to="/memories">Crear Recordatorio</router-link></ion-label>
    </ion-item>
    <ion-item>
                 <ion-icon name="extension"></ion-icon>
      <ion-label>Mis Recordatorios</ion-label>
    </ion-item>

  </ion-list>
    </ion-content>
  </ion-menu>
  <ion-menu-controller></ion-menu-controller>
   
</template>


<script>
import { bodyOutline, imagesOutline, extensionPuzzleOutline  } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
  "profile":  bodyOutline,
  "add" :  imagesOutline,
  "extension" : extensionPuzzleOutline,


});

export default {
    name: 'Micomponente'
}
</script>

<style scoped>
ion-list {

    margin-top: 100px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;

}
ion-item, ion-content {

    --background: var(--ion-background-color,linear-gradient(to  left,#e622cc, #1C4577)) !important;
    color: white;

}

img {
  margin-bottom: 4rem !important;
  margin-left: 4rem;
}

ion-icon {
  color:white !important;
  font-size: 30px; 
  margin-right: 1rem;
}

#imagentitulo {
    height: 70px;
    width: auto;
}

ion-label {
    text-decoration: none !important;
    color: white !important;
}
</style>