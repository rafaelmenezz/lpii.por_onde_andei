import { LocReverso } from '@/config/LocReverso'

export class Localizacao {
   private _latitude: number
   private _longitude: number
   private _cidade = ''


   constructor(latitude: number, longitude: number) {

      this._latitude = latitude
      this._longitude = longitude
   }


   //locality: "Palhoça"
   //region_code: "SC"
   async buscarCidade() {
      const text = new LocReverso()
      await text.reverso(this._latitude, this._longitude)

      this._cidade = text.resposta
      console.log(this._cidade)
   }
   set cidade(cidade: string) {
      this._cidade = cidade
   }
   get cidade() {
      return this._cidade
   }

   public set latitude(latitude: number) {
      this._latitude = latitude
   }
   public get latitude() {
      return this._latitude
   }

   public set longitude(longitude: number) {
      this._longitude = longitude
   }
   public get longitude() {
      return this._longitude
   }


}