import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ReceiptService } from './receipt.service';

@Controller('extract-receipt-details')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['.jpg', '.jpeg', '.png'];
        const fileExt = extname(file.originalname).toLowerCase();
        if (!allowedTypes.includes(fileExt)) {
          return cb(new BadRequestException('Only JPG, JPEG, PNG files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadReceipt(@UploadedFile() file: Express.Multer["File"]) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.receiptService.extractReceiptDetails(file);
  }
}
