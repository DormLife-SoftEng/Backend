import {} from 'class-validator';

export class propsSearchDto {
  //dorm
  dormName: string;
  distance: number; // address.coord - kaset.coord
  rating: number;
  gender: string;
  //room
  price: number;
  maxperson: number;
  dormType: string;
  //room2
  kitchen:  number; //true = 0, false = 999999999999999999
  aircond:  number; //true = 0, false = 999999999999999999
  bathroom: number; //true = 0, false = 999999999999999999
  bedroom:  number; //true = 0, false = 999999999999999999

  //util
  // in utility.type
  convenienceStore: string; //true = convenienceStore, false = '' 
  laundry: string; // true = laundry, false = ''
  parking: string;
  pet: string;
  internet: string;
  smoking: string;
  fitness: string;
  pool: string;
  cooking: string;
  kuy : string;
}
