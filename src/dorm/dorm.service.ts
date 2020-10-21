import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Dorm, UtilityInterface, RoomInterface } from './dorm.model';
import {UserDocument} from 'src/users/schemas/users.schemas';

enum Sex {
  'male',
  'female',
  'any',
}

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
    owner: string,
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

  async getDormByOwner(dormOwner: UserDocument): Promise<Dorm[]> {
  	const dorm = await this.DormModel.find({owner: dormOwner}).exec();
	return dorm;
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

  // filter dorm
  async getDormList(
    Dname: string,
    Daddress: string,
    Dcoordinate: [number],
    DutilityArray: any,
    DroomArray: any,
    DallowedSex: Sex,
    offset: string,
    stop: string,
  ): Promise<any> {
    const Offset = parseInt(offset);
    const Stop = parseInt(stop);

    const dorms = await this.DormModel.find({
      name: Dname,
      'address.address': Daddress,
      'address.coordinate': Dcoordinate,
      // "utility": DutilityArray,
      // "room":DroomArray,
      allowedSex: DallowedSex,
    })
      .limit(Stop)
      .exec();

    // console.log(DroomArray);

    return dorms
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
  }
}
