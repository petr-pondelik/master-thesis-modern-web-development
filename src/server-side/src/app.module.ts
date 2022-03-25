import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConfigPath } from './common/getConfigPath';
import { ConfigModule } from '@nestjs/config';

const envFilePath = getConfigPath(`${__dirname}/../config`);

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
