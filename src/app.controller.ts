import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/parse-product/:id')
  async getInfo(@Param('id', ParseIntPipe) id?: number): Promise<string> {
    const res = await this.appService.getInfo(id);
    return res;
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/parse-min-price/:id')
  async getMinPrice(@Param('id', ParseIntPipe) id?: number): Promise<string> {
    const res = await this.appService.getMinPrice(id);
    return res;
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/parse-seller-spot/:id')
  async getSellerSpot(@Param('id', ParseIntPipe) id?: number): Promise<string> {
    const res = await this.appService.getSellerSpot(id);
    return res;
  }
}
