import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Loading from '../src/component/status/Loading'
import ErrorPage from '../src/component/status/Error'

Enzyme.configure({ adapter: new Adapter() })

test('Error renderer', () => {
  const mounted = mount(<ErrorPage />)
  expect(mounted.find('div')).toHaveText('发生了一些异常')
})

test('Loading renderer', () => {
  const mounted = mount(<Loading />)
  expect(mounted.find('div')).toHaveText('加载中...')
})
