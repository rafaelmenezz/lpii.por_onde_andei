


export class Geoloc {
   private _latitude: number;
   private _longitude: number;

   constructor() {
      this._latitude = 0
      this._longitude = 0
      this.myPosition()
   }

 

   get latitude() {
      return this._latitude
   }
   get longitude() {
      return this._longitude
   }
}