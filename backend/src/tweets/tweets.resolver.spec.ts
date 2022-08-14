import { Test, TestingModule } from '@nestjs/testing';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './schemas/tweet.schema';
import { TweetsResolver } from './tweets.resolver';
import { TweetsService } from './tweets.service';

describe(TweetsResolver.name, () => {
  let resolver: TweetsResolver;
  let service: TweetsService;

  const createTweetInput: CreateTweetInput = {
    author: 'Tweet #1',
    text: 'Are you excited for the weekend?',
  };
  const mockTweet: Tweet = {
    id: 'a id',
    author: createTweetInput.author,
    text: createTweetInput.text,
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
      controllers: [TweetsResolver],
      providers: [
        {
          provide: TweetsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(tweetsArray),
            create: jest.fn().mockResolvedValue(createTweetInput),
          },
        },
      ],
    }).compile();

    resolver = module.get<TweetsResolver>(TweetsResolver);
    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new Tweet', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockTweet);

      await resolver.create(createTweetInput);
      expect(createSpy).toHaveBeenCalledWith(createTweetInput);
    });
  });

  describe('findAll()', () => {
    it('should return an array of Tweets', async () => {
      expect(resolver.findAll()).resolves.toEqual(tweetsArray);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
