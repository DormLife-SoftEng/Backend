import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Dorm,
  DormAdd,
  DormQuery,
  UtilityInterface,
  RoomInterface,
} from './dorm.model';

@Injectable()
export class DormService {
  constructor(
    @InjectModel('Dorm') private readonly DormModel: Model<Dorm>,
    @InjectModel('DormAdd') private readonly DormAddModel: Model<DormAdd>,
    @InjectModel('DormQuery') private readonly DormQueryModel: Model<DormQuery>,
    @InjectModel('Utility') private readonly UtilityModel: Model<UtilityInterface>,
    @InjectModel('Room') private readonly RoomModel: Model<RoomInterface>,
  ) {}
  
  addRoom(roomArray:RoomInterface[]) {
    var newRoomArray:any[] = [];

    for(var i=0;i<roomArray.length;i++) {
      const newRoom = new this.RoomModel({
        name:roomArray[i].name,
        capacity: roomArray[i].capacity,
        image:roomArray[i].image,
        bathroom: roomArray[i].bathroom,
        aircond: roomArray[i].aircond,
        kitchen: roomArray[i].kitchen,
        bedroom: roomArray[i].bedroom,
        description: roomArray[i].description,
        price: {
          amount: roomArray[i].price.amount,
          pricePer: roomArray[i].price.pricePer,
        },
        allowedSex: roomArray[i].allowedSex
      });
      newRoomArray.push(newRoom);
    }
    return newRoomArray;
  }

  addUtility(utilityArray:UtilityInterface[]) {
    var newUtilArray = [];
    for(var i=0;i<utilityArray.length;i++) {
      const newUtil = new this.UtilityModel({
        type: utilityArray[i].type,
        distance: utilityArray[i].distance,
        description: utilityArray[i].description
      })
      newUtilArray.push(newUtil);
    }
    return newUtilArray;
  }

  async insertDorm(name: string, contact: any) {
    let generatedCode = Math.random()
      .toString(36)
      .substring(7);

    const newDorm = new this.DormAddModel({
      name: name,
      contact: {
        telephone: contact.telephone,
      },
    });

    const result = await newDorm.save();

    return result.id as string;
  }

  // async getAll() {
  //   const dorm = await this.DormAddModel.find().exec();
  //   return dorm.map(d => ({
  //     id: d.id,
  //     name: d.name,
  //     contact: {
  //       telephone: d.contact.telephone,
  //     },
  //   }));
  // }
}
