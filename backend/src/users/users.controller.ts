import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getById(Number(id));
  }

  @Post()
  createUser(@Body() dto: UserDto) {
    return this.usersService.createUser(dto);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() dto: UserDto) {
    return this.usersService.updateUser(Number(id), dto);
  }

  @Patch(':id')
  patchUser(@Param('id') id: number, @Body() partial: Partial<UserDto>) {
    return this.usersService.patchUser(Number(id), partial);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(Number(id));
  }

  @Get('role')
  getByRole(@Query('role') role: string) {
    return this.usersService.getByRole(role);
  }
}
