import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Dorm, UtilityInterface, RoomInterface } from './dorm.model';
import { UserDocument } from '../users/schemas/users.schemas';

@Injectable()
export class DormService {
  constructor(
    @InjectModel('Dorm')
	private readonly DormModel: Model<Dorm>,
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
    coordinate: number[],
    utilityArray: any,
    type: string,
    description: string,
    roomArray: any,
    allowedSex: string,
    image: string[],
    license: string[],
  ) {
    let generatedCode = Math.random() // change to the actual code
      .toString(36)
      .substring(7);

    // const owner = findOwnerbyID? --find owner from DB using UserService??
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
      image: image,
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
    let room: RoomInterface;
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

  private utilChk(util: string, arr: any) {
    if (util === undefined) {
    } else {
      arr.push({ type: util });
    }
  }

  private async findDormList(propsSearch, utilsSearch, stop: string): Promise<any> {
    const Stop = parseInt(stop);
    const dorms = await this.DormModel.find(propsSearch)
      .limit(Stop)
      .exec();
    // console.log(dorms);

    const myUtil = dorms.map(res => ({
      utility: res.utility.map(r => ({
        type: r.type,
      })),
    }));

    let mySearch = [];
    this.utilChk(utilsSearch.convenienceStore, mySearch);
    this.utilChk(utilsSearch.laundry, mySearch);
    this.utilChk(utilsSearch.parking, mySearch);
    this.utilChk(utilsSearch.pet, mySearch);
    this.utilChk(utilsSearch.internet, mySearch);
    this.utilChk(utilsSearch.fitness, mySearch);
    this.utilChk(utilsSearch.pool, mySearch);
    this.utilChk(utilsSearch.cooking, mySearch);

    // [ { utility: [ [Object], [Object] ] } ]
    // [ { type: 'laundry' }, { type: 'pet' } ]

    console.log(myUtil);
    console.log(mySearch);

    // return myUtil;

    let res = [];
    for (let i = 0; i < myUtil.length; i++) { //for each dorm
      let dorm_state = 1; //will store this dorm

      for (let j = 0; j < mySearch.length; j++) { //for each filter
        let filter_state = 0; //won't search in this dorm any more

        for (let k = 0; k < myUtil[i].utility.length; k++) { //check if filter in dorm

          if (myUtil[i].utility[k].type === mySearch[j].type) {
            filter_state = 1; //still check other filter
            break;
          }
        }

        if (!filter_state) { //set state to skip this dorm
          dorm_state = 0;
          break;
        }
      }

      if (!dorm_state) { //skip this dorm
        continue;
      } else { //store this dorm
        res.push(dorms[i]);
      }
    }

    return dorms;
  }

  // filter dorm
  async getDormList(propsSearch, utilsSearch, offset: string, stop: string) {
    const Offset = parseInt(offset);

    propsSearch.distance = { $gte: propsSearch.distance };
    propsSearch.rating = { $gte: propsSearch.rating };
    propsSearch['room.price.amount'] = { $lte: propsSearch['room.price.amount'] };
    propsSearch['room.kitchen'] = { $gte: propsSearch['room.kitchen'] };
    propsSearch['room.aircond'] = { $gte: propsSearch['room.aircond'] };
    propsSearch['room.bathroom'] = { $gte: propsSearch['room.bathroom'] };
    propsSearch['room.bedroom'] = { $gte: propsSearch['room.bedroom'] };

    const dorms = await this.findDormList(propsSearch, utilsSearch, stop);
    // return dorms;
    const res = dorms
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
    return res;
  }
}
