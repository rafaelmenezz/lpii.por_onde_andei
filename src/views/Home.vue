
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title> Por Onde Andei? </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid fixed>
        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Localização</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-row>
                  <ion-col size="6">
                    <ion-input
                      type="number"
                      placeholder="Latitude"
                      v-model="lat"
                    ></ion-input>
                  </ion-col>
                  <ion-col size="6">
                    <ion-input
                      type="number"
                      placeholder="Longitude"
                      v-model="long"
                    ></ion-input>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <ion-button expand="block" @click="salvarLocalizacao"
                      >Salvar</ion-button
                    >
                  </ion-col>
                </ion-row>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Component Vue Local  -->

      <ion-grid fixed v-show="list.length > 0">
        <ion-row v-for="(item, index) in list" v-bind:key="index">
          <Local
            :latitude="item.latitude"
            :longitude="item.longitude"
            :cidade="item.cidade"
          />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { Storage } from "@ionic/storage";
import Local from "@/views/Local.vue";
import { Localizacao } from "@/model/localizacao";
import { Geolocation } from "@capacitor/geolocation";
import { LocReverso } from "@/config/LocReverso";

export default defineComponent({
  name: "Home",

  components: {
    Local,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  data() {
    return {
      lat: "",
      long: "",
      localStorage: new Storage(),
      reverso: new LocReverso(),
      local: Localizacao,
      list: [],
    };
  },

  ionViewWillEnter() {
    this.myPosition();
  },
  created: async function () {
    await this.localStorage.create();
  },
  methods: {
    async myPosition() {
      const coordinates = await Geolocation.getCurrentPosition();
      this.lat = coordinates.coords.latitude;
      this.long = coordinates.coords.longitude;
    },
    async salvarLocalizacao() {
      this.local = new Localizacao(
        parseFloat(this.lat),
        parseFloat(this.long)
      );
      await this.local.buscarCidade();

      this.list.push(this.local);
      this.salvarStorage();

      this.lat = "";
      this.long = "";
    },

    async salvarStorage() {
      await this.localStorage.set("list", JSON.stringify(this.list));
    },
  },
});
</script>

<style scoped>
.ml-2 {
  margin-left: 1em;
}
.t-center {
  text-align: center;
}
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>