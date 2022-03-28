import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateDto } from './dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  async create(@Body() dto: CreateDto) {
    await this.subscriptionService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) _id: number) {
    //  TODO
    return _id;
  }
}
