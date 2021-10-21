import { Http } from '@capacitor-community/http';

export class LocReverso {

   private _link = 'http://api.positionstack.com/v1/reverse?access_key='
   private _key = '22c5e046f3b7a0b54999ed9254cfe645'
   private _resposta = ''


   async reverso(lat: number, lon: number) {
      const url = this._link + this._key + '&query=' + lat + ',' + lon

      const options = {
         url
      }
      const response = await Http.request({ ...options, method: 'GET' })
      this._resposta = response.data.data[0].locality + ',' + response.data.data[0].region_code
   }

   get resposta() {
      return this._resposta
   }



}