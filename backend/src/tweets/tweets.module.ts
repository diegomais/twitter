import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { TweetsResolver } from './tweets.resolver';
import { TweetsService } from './tweets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
  ],
  providers: [TweetsResolver, TweetsService],
})
export class TweetsModule {}
