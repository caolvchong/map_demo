import React from 'react'
import TestRenderer from 'react-test-renderer'
import Loading from '../src/component/status/Loading'
import ErrorPage from '../src/component/status/Error'

test('Error renderer', () => {
  const renderer = TestRenderer.create(
    <ErrorPage />
  )
  expect(renderer.toJSON()).toMatchSnapshot()
})

test('Loading renderer', () => {
  const renderer = TestRenderer.create(
    <Loading />
  )
  expect(renderer.toJSON()).toMatchSnapshot()
})
