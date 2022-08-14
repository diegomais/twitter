import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './schemas/tweet.schema';
import { TweetsService } from './tweets.service';

describe(TweetsService.name, () => {
  let model: Model<Tweet>;
  let service: TweetsService;

  const createTweetInput: CreateTweetInput = {
    author: 'Tweet #1',
    text: 'Are you excited for the weekend?',
  };
  const mockTweet: Tweet = {
    id: 'a id',
    author: 'Tweet #1',
    text: 'Are you excited for the weekend?',
    likeCount: 0,
    createdAt: new Date(),
  };
  const tweetsArray: Tweet[] = [
    {
      id: 'ID #1',
      author: 'Tweet #1',
      text: 'Text #1',
      likeCount: 4,
      createdAt: new Date(),
    },
    {
      id: 'ID #2',
      author: 'Tweet #2',
      text: 'Text #2',
      likeCount: 3,
      createdAt: new Date(),
    },
    {
      id: 'ID #3',
      author: 'Tweet #3',
      text: 'Text #3',
      likeCount: 2,
      createdAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetsService,
        {
          provide: getModelToken(Tweet.name),
          useValue: {
            constructor: jest.fn().mockResolvedValue(mockTweet),
            create: jest.fn(),
            exec: jest.fn(),
            find: jest.fn(),
            new: jest.fn().mockResolvedValue(mockTweet),
          },
        },
      ],
    }).compile();

    model = module.get<Model<Tweet>>(getModelToken(Tweet.name));
    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should insert a new Tweet', async () => {
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockTweet));
      const newTweet = await service.create(createTweetInput);
      expect(newTweet).toEqual(mockTweet);
    });
  });

  describe('findAll()', () => {
    it('should return all Tweets', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        sort: jest.fn(() => ({
          exec: jest.fn().mockResolvedValueOnce(tweetsArray),
        })),
      } as any);
      const tweets = await service.findAll();
      expect(tweets).toEqual(tweetsArray);
    });
  });
});
