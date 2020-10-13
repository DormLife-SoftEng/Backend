import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PendingAction } from './admin.model';
import { TicketBodyDto } from './admin.validation';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('PendingAction')
    private readonly pendingActionModel: Model<PendingAction>,
  ) {}

  async findTicket(stop: number): Promise<PendingAction[]> {
    let review;
    try {
      review = await this.pendingActionModel
        .find()
        .limit(stop)
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find ticket.');
    }
    if (!review) {
      throw new NotFoundException('Could not find ticket.');
    }
    return review;
  }

  async getTicketsList(offset: string, stop: string) {
    const _offset = parseInt(offset);
    const _stop = parseInt(stop);
    const tickets = await this.findTicket(_stop);
    return tickets
      .map(ticket => ({
        id: ticket.id,
        target: ticket.target,
        newdata: ticket.newdata,
        createdOn: ticket.createdOn,
        createdBy: {
          userId: ticket.createdBy.userId,
          name: {
            firstname: ticket.createdBy.name.firstname,
            lastname: ticket.createdBy.name.lastname,
          },
          profilePic: ticket.createdBy.profilePic,
        },
        status: ticket.status,
      }))
      .slice(_offset);
  }

  async addTicket(ticketBody: TicketBodyDto) {
    const newTicket = new this.pendingActionModel({
      target: ticketBody.target,
      newdata: ticketBody.newdata,
      createdOn: Date.now(),
      createdBy: {
        userId: ticketBody.createdBy.userId,
        name: {
          firstname: ticketBody.createdBy.name.firstname,
          lastname: ticketBody.createdBy.name.lastname,
        },
        profilePic: ticketBody.createdBy.profilePic,
      },
      status: ticketBody.status,
    });
    const result = await newTicket.save();
    return result.id as string;
  }
}
