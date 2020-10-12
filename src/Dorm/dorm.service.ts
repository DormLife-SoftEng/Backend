import { Injectable } from "@nestjs/common";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

import { Dorm } from "./dorm.model"

@Injectable()
export class DormService {
    constructor(
        @InjectModel('Dorm') private readonly DormModel: Model<Dorm>,
      ) {}
}