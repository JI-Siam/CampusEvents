import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
    private admins: {
        id: number;
        name: string;
        password: string;
        phone: string;
        fileName?: string | null;
    }[] = [];

    getAllAdmins() {
        return this.admins;
    }

    getAdminById(id: number) {
        const admin = this.admins.find((s) => s.id === id);
        if (!admin) {
            throw new NotFoundException('Admin not found');
        }
        return admin;
    }

    createAdmin(createAdminDto: CreateAdminDto, file?: Express.Multer.File) {
        const newAdmin = {
            id: Date.now(),
            ...createAdminDto,
            fileName: file ? file.filename : null,
        };
        this.admins.push(newAdmin);
        return newAdmin;
    }

    updateAdmin(id: number, data: { name: string, password: string, phone: string }) {
        const index = this.admins.findIndex((s) => s.id === id);
        if (index === -1) throw new NotFoundException('Admin not found!');
        this.admins[index] = {
            ...this.admins[index],
            ...data,
        };
        return this.admins[index];
    }

    patchAdmin(id: number, data: Partial<{ name: string, password: string, phone: string }>) {
        const admin = this.getAdminById(id);
        Object.assign(admin, data);
        return admin;
    }

    //Delete
    deleteAdmin(id: number) {
        const index = this.admins.findIndex((s) => s.id === id);
        if (index === - 1) return null;
        const deleted = this.admins.splice(index, 1);
        return { message: 'Admin Deleted', admin: deleted[0] };
    }

}