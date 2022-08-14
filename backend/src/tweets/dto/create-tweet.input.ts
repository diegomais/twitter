import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTweetInput {
  @Field(() => String, {
    description: 'The identifier of the User of the Tweet being created.',
  })
  author: string;

  @Field(() => String, { description: 'Text of the Tweet being created.' })
  text: string;
}
