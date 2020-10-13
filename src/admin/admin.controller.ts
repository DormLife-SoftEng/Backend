import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
  } from '@nestjs/common';
  import { AdminService } from './admin.service';
  
  @Controller('/tickets')
  export class AdminController {
    constructor(private readonly adminService: AdminService) {}
  
    
  }
  