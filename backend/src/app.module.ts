import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { join } from 'path';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        APOLLO_GRAPH_REF: Joi.string(),
        APOLLO_KEY: Joi.string(),
        APOLLO_SCHEMA_REPORTING: Joi.boolean(),
        MONGODB_URI: Joi.string()
          .uri({ scheme: /mongodb(\+srv)?/ })
          .required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(4000),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      persistedQueries: false,
      sortSchema: true,
      subscriptions: { 'graphql-ws': true },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    TweetsModule,
  ],
})
export class AppModule {}
