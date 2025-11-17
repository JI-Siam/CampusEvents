import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('g')
    getAll() {
        return this.adminService.getAllAdmins();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.adminService.getAdminById(Number(id));
    }

    @Post('p')
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(pdf)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },

            limits: { fileSize: 2 * 1024 * 1024 },

            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    cb(null, Date.now() + '-' + file.originalname)
                },
            }),
        }),
    )
    @UsePipes(new ValidationPipe())
    createAdmin(@Body() createAdminDto: CreateAdminDto, @UploadedFile() file: Express.Multer.File,) {
        const newAdmin = this.adminService.createAdmin(createAdminDto, file);
        return newAdmin;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: CreateAdminDto) {
        return this.adminService.updateAdmin(Number(id), body);
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() body: Partial<CreateAdminDto>) {
        return this.adminService.patchAdmin(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.adminService.deleteAdmin(Number(id));
    }


}
