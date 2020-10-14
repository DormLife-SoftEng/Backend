import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Dorm, UtilityInterface, RoomInterface, DormQuery } from './dorm.model';
import { DormModule } from './dorm.module';
import { UserDocument } from '../users/schemas/users.schemas';
import { propsSearchDto } from './kuy';
import { arrayContains } from 'class-validator';

@Injectable()
export class DormService {
  constructor(
    @InjectModel('Dorm') private readonly DormModel: Model<Dorm>,
    @InjectModel('Utility')
    private readonly UtilityModel: Model<UtilityInterface>,
    @InjectModel('Room') private readonly RoomModel: Model<RoomInterface>,
  ) {}

  // Create room array
  addRoom(roomArray: RoomInterface[]) {
    var newRoomArray: any[] = [];

    for (var i = 0; i < roomArray.length; i++) {
      const newRoom = new this.RoomModel({
        name: roomArray[i].name,
        capacity: roomArray[i].capacity,
        image: roomArray[i].image,
        bathroom: roomArray[i].bathroom,
        aircond: roomArray[i].aircond,
        kitchen: roomArray[i].kitchen,
        bedroom: roomArray[i].bedroom,
        description: roomArray[i].description,
        price: {
          amount: roomArray[i].price.amount,
          pricePer: roomArray[i].price.pricePer,
        },
        allowedSex: roomArray[i].allowedSex,
      });
      newRoomArray.push(newRoom);
    }
    return newRoomArray;
  }

  //Create utility array
  addUtility(utilityArray: UtilityInterface[]) {
    var newUtilArray = [];
    for (var i = 0; i < utilityArray.length; i++) {
      const newUtil = new this.UtilityModel({
        type: utilityArray[i].type,
        distance: utilityArray[i].distance,
        description: utilityArray[i].description,
      });
      newUtilArray.push(newUtil);
    }
    return newUtilArray;
  }

  //Create new dorm
  async insertDorm(
    name: string,
    owner: UserDocument,
    telephone: string,
    email: string,
    lineID: string,
    website: string,
    address: string,
    coordinate: [number],
    utilityArray: any,
    type: string,
    description: string,
    roomArray: any,
    allowedSex: string,
    license: string[],
  ) {
    let generatedCode = Math.random() // need to change to the actual code
      .toString(36)
      .substring(7);

    const rooms = this.addRoom(roomArray);
    const utilities = this.addUtility(utilityArray);
    const newDorm = new this.DormModel({
      name: name,
      code: generatedCode,
      owner: owner,
      contact: {
        telephone: telephone,
        email: email,
        lineID: lineID,
        website: website,
      },
      address: {
        address: address,
        coordinate: coordinate,
      },
      utility: utilities,
      type: type,
      description: description,
      room: rooms,
      allowedSex: allowedSex,
      license: license,
    });

    const result = await newDorm.save();

    return result.id as string;
  }

  //show all dorm list
  async getAll(): Promise<any> {
    const dorm = await this.DormModel.find().exec();
    const kuy = dorm.map(res => {
      kuy2: res.utility.map(util=>{
        kuy2: util.type
      })
    })
    console.log(kuy);
    return dorm.map(d => ({
      id: d.id,
      name: d.name,
      address: {
        address: d.address.address,
        coordinate: d.address.coordinate,
      },
      utility: d.utility.map(res => ({
        type: res.type,
        distance: res.distance,
        description: res.description,
      })),
      room: d.room.map(res => ({
        price: res.price,
        image: res.image,
        name: res.name,
        capacity: res.capacity,
        bathroom: res.bathroom,
        aircond: res.aircond,
        kitchen: res.kitchen,
        bedroom: res.bedroom,
        description: res.description,
        allowedSex: res.allowedSex,
      })),
      allowedSex: d.allowedSex,
    }));
  }

  //get specific dorm
  async getSingleDorm(dormID: string) {
    const dorm = await this.findDorm(dormID);
    return dorm;
  }

  //get all room of specific dorm
  async getAllDormRoom(dormID: string) {
    const dorm = await this.findDorm(dormID);
    return {
      room: dorm.room,
    };
  }

  //get specific room of specific dorm
  async getDormRoom(dormID: string, roomID: string) {
    const dorm = await this.findDorm(dormID);
    let room;
    for (var i = 0; i < dorm.room.length; i++) {
      if (dorm.room[i].id == roomID) {
        room = dorm.room[i];
      }
    }
    return room;
  }

  private async findDorm(id: string): Promise<Dorm> {
    let dorm;
    try {
      dorm = await this.DormModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find dorm.');
    }
    if (!dorm) {
      throw new NotFoundException('Could not find dorm.');
    }
    return dorm;
  }

  private async findDormList(
    propsSearch: propsSearchDto,
    stop: string,
  ): Promise<Dorm[]> {
    const Stop = parseInt(stop);

    const dorms = await this.DormModel.find({
      name: propsSearch.dormName,
      distance: propsSearch.distance,
      avgStar: propsSearch.rating,
      allowedSex: propsSearch.gender,
      type: propsSearch.dormType,
      'room.price.amount': { $lt: propsSearch.price },
      'room.capacity': { $lt: propsSearch.maxperson },
      'room.kitchen': { $gt: propsSearch.kitchen },
      'room.aircond': { $gt: propsSearch.aircond },
      'room.bathroom': { $gt: propsSearch.bathroom },
      'room.bedroom': { $gt: propsSearch.bedroom },
    })
      .limit(Stop)
      .exec();
  
    const kuy = dorms.map(res => {
      kuy2: res.utility.map(util=>{
        kuy2: util.type
      })
    })
    console.log(kuy);
    let res = [];
    for (let i=0;i<dorms.length;i++) {
      // if (arr1.every((util) => arr2.indexOf(util) >= 0 )) {

      // }
    }

    return dorms;
  }

  // filter dorm
  async getDormList(propsSearch: propsSearchDto, offset: string, stop: string) {
    const Offset = parseInt(offset);

    const dorms = await this.findDormList(propsSearch, stop);

    const kuy = dorms
      .map(d => ({
        name: d.name,
        address: {
          address: d.address.address,
          coordinate: d.address.coordinate,
        },
        utility: d.utility.map(res => ({
          type: res.type,
          distance: res.distance,
          description: res.description,
        })),
        room: d.room.map(res => ({
          price: res.price,
          image: res.image,
          name: res.name,
          capacity: res.capacity,
          bathroom: res.bathroom,
          aircond: res.aircond,
          kitchen: res.kitchen,
          bedroom: res.bedroom,
          description: res.description,
          allowedSex: res.allowedSex,
        })),
        allowedSex: d.allowedSex,
      }))
      .slice(Offset);
    return kuy;
  }
}
