import { Injectable } from "@nestjs/common";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

import { Dorm } from "./dorm.model"

@Injectable()
export class DormService {
    constructor(
        @InjectModel('Dorm') private readonly DormModel: Model<Dorm>,
      ) {}

    async insert(name: string, contact:any) {
      const newDorm = new this.DormModel({
        name: name,
        contact: {
          telephone: contact.telephone
        }
      });
      const result = await newDorm.save();
      return result.id as string;
    }

    async getAll() {
      const dorm = await this.DormModel.find().exec();
      return dorm.map(d => ({
        id: d.id,
        name: d.name,
        contact: { 
          telephone : d.contact.telephone }
      }));
    }
}