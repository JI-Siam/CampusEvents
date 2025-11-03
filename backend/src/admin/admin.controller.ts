import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin') //Decorator -> @Controller() and admin -> route; Here we can request Get, Post, Put, Delete;
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @Get()
    getAdmin(){
        return this.adminService.getAdminInfo()
    }

    @Get(':id')
    getAdminsById(@Param('id') id: string){
        return this.adminService.getAdminById(Number(id))
    }
}
