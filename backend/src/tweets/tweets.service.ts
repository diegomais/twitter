import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet, TweetDocument } from './schemas/tweet.schema';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private readonly tweetModel: Model<TweetDocument>,
  ) {}

  create(createTweetInput: CreateTweetInput): Promise<Tweet> {
    return this.tweetModel.create(createTweetInput);
  }

  findAll(): Promise<Tweet[]> {
    return this.tweetModel.find().sort('-createdAt').exec();
  }

  async likeATweet(id: string): Promise<Tweet> {
    const tweet = await this.tweetModel.findById(id);

    tweet.set({ likeCount: tweet.likeCount + 1 });

    await tweet.save();

    return tweet;
  }
}
