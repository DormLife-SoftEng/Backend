import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ModelOptions, MongooseFilterQuery, Query } from "mongoose";
import { DormService } from "src/dorm/dorm.service";
import { ReviewBodyDto } from "../review.dto";
import { Review, ReviewPrimitive } from "../review.model";


@Injectable()
export class ReviewRepository {
    constructor (
        @InjectModel('Review') private readonly reviewModel: Model<Review>,
        private readonly DormService: DormService
        ) {}

    async create(reviewBody: ReviewBodyDto, user:string,options?:ModelOptions, fn?: any): Promise<Review | undefined> {
        const dto: ReviewPrimitive = {...reviewBody,user:{userId:user}, createdOn: new Date().toString()};
        const dormId = dto.dorm.id
        dto.dorm = await this.DormService.getSingleDorm(dormId)
        
        //debug zone
        const dorm = await this.DormService.getSingleDorm(dormId)
        const query = { 'dorm._id': dormId };
        const reviews = await this.find(query)
        const count = reviews.length
        console.log(count)
        //end of debug zone
        
        const document = new this.reviewModel(dto);
        const result = await document.save(options, fn);
        this.updateReviewScore(dto.dorm.id, dto.star,count)
        return result;
    }

    async updateReviewScore(dormId: string, incStar: number, reviewsCount: number) {
        const dorm = await this.DormService.getSingleDorm(dormId)
        const query = { 'dorm._id': dormId };
        const reviews = await this.find(query)
        const oldStar = dorm.avgStar * reviewsCount
        const newCount = reviews.length
        console.log('before')
        console.log(`review count: ${reviewsCount}, current score: ${oldStar}`)
        const newStar = ((oldStar + incStar)/newCount)
        dorm.avgStar = newStar
        dorm.save()

        console.log('after')
        console.log(`review count: ${newCount}, current score: ${newStar}`)
    }

    async find(query: any, projection?: any, callback?: any): Promise<Review[] | undefined> {
        const result = await this.reviewModel.find(query, projection, callback);
        return result;
    }

    async findWithPagination(query: any, stop: number, projection?: any,  callback?:any): Promise<Review[] | undefined> {
        const result = await this.reviewModel.find(query, projection, callback).limit(stop);
        return result;
    }

    async findOneAndUpdate(query: any, data: any, options?: any, callback?: any) {
        try {
            const result = await this.reviewModel.findOneAndUpdate(query, data, options, callback);
            return result;
        } catch (err) {
            throw new Error('Update Failure');
        }
    }

    async deleteOne(query: any, options?:ModelOptions, callback?: any): Promise<any> {
        const result = await this.reviewModel.deleteOne(query, options, callback);
        return result;
    }

}