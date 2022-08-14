import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc: Document<Tweet>, ret) => {
      ret.id = ret._id;
    },
  },
})
export class Tweet {
  @Field(() => ID, {
    description: 'The unique identifier of the requested Tweet.',
  })
  id: string;

  @Field(() => String, {
    description: 'The identifier of the User who posted this Tweet.',
  })
  @Prop({ required: true })
  author: string;

  @Field(() => String, { description: 'The actual text of the Tweet.' })
  @Prop({ required: true })
  text: string;

  @Field(() => Int, { description: 'Number of Likes of this Tweet.' })
  @Prop({ default: 0 })
  likeCount: number;

  @Field({ description: 'Creation time of the Tweet.' })
  createdAt: Date;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

export type TweetDocument = Tweet & Document;
