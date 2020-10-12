import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { DormController } from "./dorm.controller";
import { DormService } from "./dorm.service";
import { DormSchema } from "./dorm.model";

@Module({
    imports:[MongooseModule.forFeature([{name: 'Dorm', schema: DormSchema}])],
    controllers:[DormController],
    providers:[DormService]
})
export class DormModule {}