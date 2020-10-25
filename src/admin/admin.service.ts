import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PendingAction } from './admin.model';
import { TicketBodyDto, TicketIdDto } from './admin.dto';
import { Dorm } from '../dorm/dorm.model';
import { UserDocument } from '../users/schemas/users.schemas';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('PendingAction')
    private readonly pendingActionModel: Model<PendingAction>,
    @InjectModel('Dorm')
    private readonly DormModel: Model<Dorm>,
    @InjectModel('UserDocument')
    private readonly UserModel: Model<UserDocument>,
  ) {};

  async findTicket(stop: number): Promise<PendingAction[]> {
    let ticket;
    try {
      ticket = await this.pendingActionModel
        .find()
        .limit(stop)
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find ticket.');
    }
    if (!ticket) {
      throw new NotFoundException('Could not find ticket.');
    }
    return ticket;
  }

  async findSingleTicket(ticketId: TicketIdDto): Promise<PendingAction> {
    let ticket;
    try {
      ticket = await this.pendingActionModel.findById(ticketId.ticketId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find ticket.');
    }
    if (!ticket) {
      throw new NotFoundException('Could not find ticket.');
    }
    return ticket;
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
      type: ticketBody.type,
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

  async getSingleTicket(ticketId: TicketIdDto) {
    const ticket = await this.findSingleTicket(ticketId);
    return {
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
    };
  }

  async changeStatus(ticketId: TicketIdDto) {
    const ticket = await this.findSingleTicket(ticketId);
    if (ticket.status === 'pending' || ticket.status === 'disapproved') {
      ticket.status = 'approved';
      //get target data
      const target = ticket.target;
      if (ticket.type === 'user') {
        let user = await this.UserModel.findById(target._id);
        user = ticket.newdata;
        user.save();
      } else if (ticket.type === 'dorm') {
        let dorm = await this.DormModel.findById(target._id);
        dorm = ticket.newdata;
        dorm.save();
      } else {
        throw new BadRequestException('type should be user or dorm');
      }
    } else if (ticket.status === 'approved') {
      ticket.status = 'disapproved';
    } else {
      throw new BadRequestException(
        'Ticket should be pending or disapproved or approved.',
      );
    }

    ticket.save();
    return ticket.id as string;
  }

  async deleteTicket(ticketId: TicketIdDto) {
    const result = await this.pendingActionModel
      .deleteOne({ _id: ticketId.ticketId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find ticket.');
    }
  }
}
