import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './schemas/tweet.schema';
import { TweetsService } from './tweets.service';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}

  @Mutation(() => Tweet, { name: 'createTweet' })
  create(@Args('createTweetInput') createTweetInput: CreateTweetInput) {
    return this.tweetsService.create(createTweetInput);
  }

  @Query(() => [Tweet], { name: 'tweets' })
  findAll() {
    return this.tweetsService.findAll();
  }

  @Mutation(() => Tweet)
  likeATweet(@Args('id') id: string) {
    return this.tweetsService.likeATweet(id);
  }
}
