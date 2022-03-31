import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { getConfigPath } from './common/helper';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ReadingListModule } from './reading-list/reading-list.module';

const envFilePath = getConfigPath(`${__dirname}/../config`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    AuthModule,
    UserModule,
    StoryModule,
    SubscriptionModule,
    PrismaModule,
    ReadingListModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
