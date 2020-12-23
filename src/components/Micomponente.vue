<template>
    <ion-app>
  <ion-menu contentId="content1" side="start" >
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
      <ion-label>Mi Perfil</ion-label>
    </ion-item>
    <ion-item>
      <ion-label><router-link to="/memories">Crear Recordatorio</router-link></ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Mis Recordatorios</ion-label>
    </ion-item>

  </ion-list>
    </ion-content>
  </ion-menu>
  <ion-router-outlet id="content1" main></ion-router-outlet>
</ion-app>
</template>


<script>
export default {
    name: 'Micomponente'
}
</script>

<style scoped>
ion-list {

    margin-top: 250px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;

}
ion-item, ion-content {

    --background: var(--ion-background-color,linear-gradient(to  left,#e622cc, #1C4577)) !important;
    color: white;

}



#imagentitulo {
    height: 50px;
    width: auto;
}

ion-label {
    text-decoration: none !important;
    color: white !important;
}
</style>