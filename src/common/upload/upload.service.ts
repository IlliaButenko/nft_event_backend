import { Injectable } from '@nestjs/common';
const sharp = require('sharp')

@Injectable()
export class UploadService {
  async upload(path, file) {
    console.log('buffer: ', file.buffer)
    var image = await sharp(file.buffer) //.resize({ width: 400, height:400 }) Resize if you want
    // .jpeg({
    //     quality: 40,
    // })
    .toFile(path)
    .catch( err => { 
        console.log('file upload error: ', err);
        return false;
    })

    return true;
  }

  async uploadByImageData(path, base64) {
    const buffer = Buffer.from(base64, 'base64');
    await sharp(buffer)
    .toFile(path)
    .catch( err => { 
        console.log('file upload error: ', err);
        return false;
    })
    return true;
  }
}
