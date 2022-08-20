import React from 'react'
import { View as MockView } from 'react-native'
import renderer from 'react-test-renderer'

import Tweet from './Tweet'

jest.mock('@expo/vector-icons', () => ({
  Ionicons: MockView,
}))

describe('<Tweet />', () => {
  it('has 3 children', () => {
    const tree = renderer
      .create(
        <Tweet
          onLike={jest.fn()}
          tweet={{
            author: 'John',
            id: 'some-id',
            likeCount: 1,
            text: 'some text',
          }}
        />
      )
      .toJSON()
    expect(tree?.children.length).toBe(3)
  })
})
