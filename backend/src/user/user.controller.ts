import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, 
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiParam({ name: 'id', example: 1, description: "ID de l'utilisateur" })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Post(":id/upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${req.params.id}-${uniqueSuffix}${ext}`);
        },
      }),
    })
  )
  async uploadProfilePic(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new Error("File is not uploaded.");
    }
    return this.userService.updateProfilePic(id, file.filename);
}

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' })
  @ApiParam({ name: 'id', example: 1, description: "ID de l'utilisateur" })
  async UpdateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.UpdateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur par ID' })
  @ApiParam({ name: 'id', example: 1, description: "ID de l'utilisateur" })
  async DeleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.DeleteUser(id);
  }
}
