import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto';
import { SubscriptionService } from './subscription.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new subscription.",
  })
  async create(@Body() dto: CreateSubscriptionDto) {
    await this.subscriptionService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete subscription.",
  })
  async delete(@Param('id', ParseIntPipe) _id: number) {
    //  TODO
    return _id;
  }
}
