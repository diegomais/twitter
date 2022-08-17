import { fireEvent, render, screen } from '@testing-library/react'
import TweetComponent from './Tweet.component'

describe(TweetComponent.name, () => {
  const tweetMock = {
    id: '62f8463924e385c8a7e1985e',
    author: 'Alphabet',
    text: 'Google’s New Robot Learned To Take Orders By Scraping The Web',
    likeCount: 2,
  }

  it('should render author, text and like count', () => {
    render(<TweetComponent tweet={tweetMock} onLike={jest.fn()} />)

    expect(screen.getByText(tweetMock.author)).toBeTruthy()
    expect(screen.getByText(tweetMock.text)).toBeTruthy()
    expect(screen.getByText(tweetMock.likeCount)).toBeTruthy()
  })

  it('should call onLike when button is clicked', () => {
    const onLikeMock = jest.fn()
    render(<TweetComponent tweet={tweetMock} onLike={onLikeMock} />)

    expect(onLikeMock).not.toBeCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(onLikeMock).toBeCalledWith(tweetMock.id)
  })
})
