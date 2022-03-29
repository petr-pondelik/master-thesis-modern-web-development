import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('API Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {}

  @Get()
  @ApiOperation({
    summary: "Return API Root definition.",
  })
  getHello(): string {
    console.log(this.configService.get('MY_ENV'));
    console.log(this.configService.get('DATABASE_URL'));
    return this.appService.getHello();
  }
}
