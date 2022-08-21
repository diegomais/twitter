import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './schemas/tweet.schema';
import { TweetsService } from './tweets.service';

const pubSub = new PubSub();
const TWEET_ADDED = 'tweetAdded';
const TWEET_LIKED = 'tweetLiked';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}

  @Mutation(() => Tweet, { name: 'createTweet' })
  create(@Args('createTweetInput') createTweetInput: CreateTweetInput) {
    const newTweet = this.tweetsService.create(createTweetInput);
    pubSub.publish(TWEET_ADDED, { tweetAdded: newTweet });
    return newTweet;
  }

  @Query(() => [Tweet], { name: 'tweets' })
  findAll() {
    return this.tweetsService.findAll();
  }

  @Mutation(() => Tweet)
  likeATweet(@Args('id') id: string) {
    const tweet = this.tweetsService.likeATweet(id);
    pubSub.publish(TWEET_LIKED, { tweetLiked: tweet });
    return tweet;
  }

  @Subscription(() => Tweet, { nullable: true })
  tweetAdded() {
    return pubSub.asyncIterator(TWEET_ADDED);
  }

  @Subscription(() => Tweet, { nullable: true })
  tweetLiked() {
    return pubSub.asyncIterator(TWEET_LIKED);
  }
}
