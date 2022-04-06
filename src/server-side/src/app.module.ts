import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ReadingListModule } from './reading-list/reading-list.module';
import { getConfigPath } from "./common/helpers";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from 'path';

const envFilePath = getConfigPath(`${__dirname}/../config`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./src/**/*.graphqls'],
      definitions: {
        path: join(process.cwd(), 'src', 'graphql', 'graphql.ts'),
        outputAs: 'class',
      },
    }),
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
