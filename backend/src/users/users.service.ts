import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Sushanto', email: 'sushanto@gmail.com', role: 'admin'},
    { id: 2, name: 'Mitu', email: 'mitu@gmail.com', role: 'student'},
    { id: 3, name: 'Siam', email: 'siam@gmail.com', role: 'teacher'},
  ];

  getAll() {
    return this.users;
  }

  getById(id: number) {
    return this.users.find((u) => u.id === id);
  }

  createUser(dto: UserDto) {
    const newUser = { id: Date.now(), ...dto };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, dto: UserDto) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users[index] = { id, ...dto };
    return this.users[index];
  }

  patchUser(id: number, partial: Partial<UserDto>) {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    Object.assign(user, partial);
    return user;
  }

  deleteUser(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
    return { message: `User ${id} deleted successfully` };
  }

  getByRole(role: string) {
    return this.users.filter((u) => u.role === role);
  }

} 
