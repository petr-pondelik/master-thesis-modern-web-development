import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConfigPath } from './common/getConfigPath';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';

const envFilePath = getConfigPath(`${__dirname}/../config`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   // host: 'postgres',
    //   // port: 5432,
    //   host: 'localhost',
    //   port: 5438,
    //   username: 'mthesis_u',
    //   password: 'mthesis_p',
    //   database: 'mthesis_db',
    //   entities: [],
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
