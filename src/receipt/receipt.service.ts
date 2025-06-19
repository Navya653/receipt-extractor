import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceiptService {
  async extractReceiptDetails(file: Express.Multer["File"]) {
    return {
      id: Date.now(),
      date: '2025-06-18',
      currency: 'INR',
      vendor_name: 'Demo Store',
      receipt_items: [
        { item_name: 'Pen', item_cost: 10 },
        { item_name: 'Notebook', item_cost: 45 }
      ],
      tax: 5,
      total: 60,
      image_url: `uploads/${file.filename}`,
    };
  }
}
