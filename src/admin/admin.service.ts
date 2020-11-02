import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PendingAction } from './admin.model';
import { TicketBodyDto, TicketIdDto } from './admin.dto';
import { Dorm } from '../dorm/dorm.model';
import { UserDocument } from '../users/schemas/users.schemas';
import { ModuleRef } from '@nestjs/core';
import { DormRepository } from 'src/dorm/repositories/dorm.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly DormRepo: DormRepository,
    @InjectModel('PendingAction')
    private readonly pendingActionModel: Model<PendingAction>,
    @InjectModel('User')
    private readonly UserModel: Model<UserDocument>,
  ) {}
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
        request: ticket.request,
        type: ticket.type,
        target: ticket.target,
        newdata: ticket.newdata,
        createdOn: ticket.createdOn,
        createdBy: ticket.createdBy,
        status: ticket.status,
      }))
      .slice(_offset);
  }

  async addTicket(ticketBody: TicketBodyDto) {
    const newTicket = new this.pendingActionModel({
      request: ticketBody.request,
      type: ticketBody.type,
      target: ticketBody.target,
      newdata: ticketBody.newdata,
      createdOn: Date.now(),
      createdBy: ticketBody.createdBy,
      status: ticketBody.status,
    });
    const result = await newTicket.save();
    return result.id as string;
  }

  async getSingleTicket(ticketId: TicketIdDto) {
    const ticket = await this.findSingleTicket(ticketId);
    return {
      id: ticket.id,
      request: ticket.request,
      type: ticket.type,
      target: ticket.target,
      newdata: ticket.newdata,
      createdOn: ticket.createdOn,
      createdBy: ticket.createdBy,
      status: ticket.status,
    };
  }

  async changeStatus(ticketId: TicketIdDto) {
    const ticket = await this.findSingleTicket(ticketId);
    const target = ticket.target;
    if (ticket.request === 'edit') {
      if (ticket.status === 'pending' || ticket.status === 'disapproved') {
        ticket.status = 'approved';
        //get target data
        if (ticket.type === 'user') {
          let user;
          try {
            user = await this.UserModel.findById(target._id);
          } catch (error) {
            throw new NotFoundException('Could not find user.');
          }
          if (!user) {
            throw new NotFoundException('Could not find user.');
          }
          user = ticket.newdata;
          user.save();
        } else if (ticket.type === 'dorm') {
          let dorm;
          try {
            dorm = await this.DormRepo.getSingleDorm(target._id);
          } catch (error) {
            throw new NotFoundException('Could not find dorm.');
          }
          if (!dorm) {
            throw new NotFoundException('Could not find dorm.');
          }
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
    } else if (ticket.request === 'delete') {
      if (ticket.status === 'pending' || ticket.status === 'disapproved') {
        ticket.status = 'approved';
        // delete
        if (ticket.type === 'user') {
          let user;
          try { 
            user = await this.UserModel.findOneAndDelete({_id: target._id});
          } catch (error) {
            throw new NotFoundException('Could not find user.');
          }
          if (!user) {
            throw new NotFoundException('Could not find user.');
          }
        } else if (ticket.type === 'dorm') {
          let dorm;
          try { 
            dorm = await this.DormRepo.getDormAndDelete(target._id);
          } catch (error) {
            throw new NotFoundException('Could not find dorm.');
          }
          if (!dorm) {
            throw new NotFoundException('Could not find dorm.');
          }
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
    else if(ticket.request == "add") {
      const dorm = ticket.newdata;
      let newDorm = this.DormRepo.AddDorm(
        dorm.name,
        dorm.code,
        dorm.owner, //ownerId
        dorm.telephone,
        dorm.email,
        dorm.lineID,
        dorm.website,
        dorm.address.address,
        dorm.address.coordinate,
        dorm.utility,
        dorm.type,
        dorm.description,
        dorm.room,
        dorm.allowedSex,
        dorm.avgStar,
        dorm.image,
        dorm.license,
        dorm.createdOn,
        Date.now(),
        "approved",
        Date.now(),

      )
      ticket.status="approved";
      ticket.save();
      return ticket.id as string;
    } else {
      throw new BadRequestException('request should be edit, add or delete');
    }
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
