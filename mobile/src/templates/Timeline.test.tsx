import React from 'react'
import { View as MockView } from 'react-native'
import renderer from 'react-test-renderer'

import Timeline from './Timeline'

jest.mock('@expo/vector-icons', () => ({
  Ionicons: MockView,
}))

describe('<Timeline />', () => {
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Timeline
          onLikeATweet={jest.fn()}
          onRefresh={jest.fn()}
          refreshing={false}
          tweets={[]}
        />
      )
      .toJSON()
    expect(tree?.children.length).toBe(1)
  })
})
