import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReviewBodyDto } from "../review.dto";
import { Review, ReviewPrimitive } from "../review.model";


@Injectable()
export class ReviewRepository {
    constructor (
        @InjectModel('Review') private readonly reviewModel: Model<Review>
        ) {}

    async create(reviewBody: ReviewBodyDto): Promise<Review | undefined> {
        const dto: ReviewPrimitive = {...reviewBody, createdOn: new Date().toString()};
        const document = new this.reviewModel(dto);
        const result = await document.save();
        return result;
    }

    async find(query: any): Promise<Review[] | undefined> {
        const result = await this.reviewModel.find({query});
        return result;
    }

    async findWithPagination(query: any, stop: number): Promise<Review[] | undefined> {
        const result = await this.reviewModel.find({query}).limit(stop);
        return result;
    }

    async findOneAndUpdate(query: any, data: any) {
        try {
            const result = await this.reviewModel.findOneAndUpdate(query, data);
        } catch (err) {
            throw new Error('Update Failure');
        }
    }

}