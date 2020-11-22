import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/users.schemas';
import { DormAddDto } from '../dorm.dto';
import { Dorm, UtilityInterface, RoomInterface } from '../dorm.model';
import { PendingAction } from '../../admin/admin.model';

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

@Injectable()
export class DormRepository {
  constructor(
    @InjectModel('Dorm')
    private readonly DormModel: Model<Dorm>,
    @InjectModel('Utility')
    private readonly UtilityModel: Model<UtilityInterface>,
    @InjectModel('Room') private readonly RoomModel: Model<RoomInterface>,
    @InjectModel('PendingAction')
    private readonly PendingActionModel: Model<PendingAction>,
  ) {}

  distanceCal(lat1, lon1) {
    const kasetLat = 13.847582362619896
    const kasetLon = 100.56961172111154
    if ((lat1 == kasetLat) && (lon1 == kasetLon)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radkasetLat = Math.PI * kasetLat/180;
      var theta = lon1-kasetLon;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radkasetLat) + Math.cos(radlat1) * Math.cos(radkasetLat) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 
      return dist;
    }
  }

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

  async AddDorm(
    name: string,
    code: string,
    owner: string,
    telephone: string,
    email: string,
    lineID: string,
    website: string,
    address: string,
    coordinate: number[],
    distance: number,
    utility: UtilityInterface[],
    type: string,
    description: string,
    room: RoomInterface[],
    allowedSex: string,
    avgStar: number,
    image: string[],
    license: string[],
    createdOn: number,
    modifiedOn: number,
    approved: string,
    approvedOn: number,
  ) {
    const contact = {
      telephone: telephone,
      email: email,
      lineID: lineID,
      website: website,
    }
    const addressObj = {
      address: address,
      coordinate: coordinate,
    }
    const newDorm = new this.DormModel({
      name: name,
      code: code,
      owner: owner,
      contact: contact,
      address:addressObj,
      distance: distance,
      utility: utility,
      type: type,
      description: description,
      room: room,
      allowedSex: allowedSex,
      avgStar: avgStar,
      image: image,
      license: license,
      createdOn: createdOn,
      modifiedOn: modifiedOn,
      approved: approved,
      approvedOn: approvedOn,
    })
    console.log(newDorm);
    const result = await newDorm.save();
  }

  async insertDorm(dorm: DormAddDto) {
    let generatedCode = Math.random() // change to the actual code
      .toString(36)
      .substring(7);

    const rooms = this.addRoom(dorm.rooms);
    const utilities = this.addUtility(dorm.utilities);
    const newDorm = new this.PendingActionModel({
      type: 'dorm',
      request: 'add',
      target: {},
      newdata: {
        //dorm part
        name: dorm.name,
        code: generatedCode,
        owner: dorm.owner, //ownerId
        contact: {
          telephone: dorm.telephone,
          email: dorm.email,
          lineID: dorm.lineID,
          website: dorm.website,
        },
        address: {
          address: dorm.address,
          coordinate: dorm.coordinate,
        },
        distance: this.distanceCal(dorm.coordinate[0], dorm.coordinate[1]),
        utility: utilities,
        type: dorm.type,
        description: dorm.description,
        room: rooms,
        allowedSex: dorm.allowedSex,
        avgStar: 0,
        image: dorm.image,
        license: dorm.license,
        createdOn: Date.now(),
        modifiedOn: Date.now(),
        approved: 'pending',
        approvedOn: null,
      },
      createdOn: Date.now(),
      createdBy: dorm.owner,
      status: 'pending',
    });
    newDorm.save();
  }

  async getAll(): Promise<any> {
    const dorm = await this.DormModel.find().exec();

    return dorm.map(d => ({
      id: d.id,
      name: d.name,
      code: d.code,
      contact: {
        telephone: d.contact?.telephone,
        email: d.contact?.email,
        lineID: d.contact?.lineID,
        website: d.contact?.website,
      },
      address: {
        address: d.address.address,
        coordinate: d.address.coordinate,
      },
      distance: d.distance,
      utility: d.utility.map(res => ({
        type: res.type,
        distance: res.distance,
        description: res.description,
      })),
      type: d.type,
      description: d.description,
      allowedSex: d.allowedSex,
      avgStar: d.avgStar,
      image: d.image,
      license: d.license,
      room: d.room.map(res => ({
        id: res.id,
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
    }));
  }

  async getDormByOwner(dormOwner: string): Promise<Dorm[]> {
    const dorm = await this.DormModel.find({ owner: dormOwner });
    // .exec();
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
    if (!util) {
    } else {
      arr.push({ type: util });
    }
  }

  private async findDormList(
    propsSearch,
    utilsSearch,
    stop: string,
  ): Promise<any> {
    const Stop = parseInt(stop);
    console.log(propsSearch)
    const dorms = await this.DormModel.find(propsSearch).limit(Stop);
    console.log(`find ${dorms.length}`)
    // .exec();
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
    this.utilChk(utilsSearch.restaurant, mySearch);
    this.utilChk(utilsSearch.restroom, mySearch);
    this.utilChk(utilsSearch.commonroom, mySearch);
    console.log(mySearch)
    // [ { utility: [ [Object], [Object] ] } ]
    // [ { type: 'laundry' }, { type: 'pet' } ]

    // console.log(myUtil);
    // console.log(mySearch);

    // return myUtil;

    let res = [];
    for (let i = 0; i < myUtil.length; i++) {
      //for each dorm
      let dorm_state = 1; //will store this dorm

      for (let j = 0; j < mySearch.length; j++) {
        //for each filter
        let filter_state = 0; //won't search in this dorm any more

        for (let k = 0; k < myUtil[i].utility.length; k++) {
          //check if filter in dorm

          if (myUtil[i].utility[k].type == mySearch[j].type) {
            filter_state = 1; //still check other filter
            break;
          }
        }

        if (!filter_state) {
          //set state to skip this dorm
          dorm_state = 0;
          break;
        }
      }

      if (!dorm_state) {
        //skip this dorm
        continue;
      } else {
        //store this dorm
        console.log(dorms[i].name)
        res.push(dorms[i]);
      }
    }
    console.log(res.length)
    return res;
  }

  // filter dorm
  async getDormList(propsSearch, utilsSearch, offset: string, stop: string) {
    const Offset = parseInt(offset);

    propsSearch.distance = { $lte: propsSearch.distance };
    propsSearch.avgStar = { $gte: propsSearch.avgStar };
    propsSearch['room.price.amount'] = {
      $lte: propsSearch['room.price.amount'],
    };
    propsSearch['room.kitchen'] = { $gte: propsSearch['room.kitchen'] };
    propsSearch['room.aircond'] = { $gte: propsSearch['room.aircond'] };
    propsSearch['room.bathroom'] = { $gte: propsSearch['room.bathroom'] };
    propsSearch['room.bedroom'] = { $gte: propsSearch['room.bedroom'] };

    const dorms = await this.findDormList(propsSearch, utilsSearch, stop);
    // return dorms;
    const res = dorms
      .map(d => ({
        id: d.id,
        name: d.name,
        code: d.code,
        contact: {
          telephone: d.contact?.telephone,
          email: d.contact?.email,
          lineID: d.contact?.lineID,
          website: d.contact?.website,
        },
        address: {
          address: d.address.address,
          coordinate: d.address.coordinate,
        },
        distance: d.distance,
        utility: d.utility.map(res => ({
          type: res.type,
          distance: res.distance,
          description: res.description,
        })),
        type: d.type,
        description: d.description,
        allowedSex: d.allowedSex,
        avgStar: d.avgStar,
        image: d.image,
        license: d.license,
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
      }))
      .slice(Offset);
    return res;
  }

  async validateCode(reviewCode: string) {
    // console.log(reviewCode);
    const dorm = await this.DormModel.findOne({ code: reviewCode });
    if (!dorm) return null;
    else return dorm;
  }

  async genNewReviewCode(ownerId: string, dormId: string) {
    let newcode = makeid(5);
    while (this.validateCode(newcode)) {
      newcode = makeid(5);
    }
    // get dorm
    try {
      const dorm = await this.DormModel.findOne({
        owner: ownerId,
        _id: dormId,
      });
      if (dorm!) {
        throw new Error('Owner Mismatch');
      }
      dorm.code = newcode;
      dorm.save();
      return newcode;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getDormAndDelete(dormId): Promise<Dorm | undefined> {
    const dorm = await this.DormModel.findByIdAndDelete(dormId);
    return dorm;
  }
}
