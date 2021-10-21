<template lang="">


          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ cidade }}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
               <ul>
                  <li>Latitude: {{latitude}}</li>
                  <li>Longitude: {{longitude}}</li>
               </ul>
              </ion-card-content>
            </ion-card>
          </ion-col>
 

   
</template>
<script>
import {
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Local",
  components: {
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },

  props: {
    latitude: Number,
    longitude: Number,
    cidade: String,
  },
});
</script>
<style lang="">
</style>