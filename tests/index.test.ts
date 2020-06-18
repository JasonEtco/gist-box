import nock from 'nock'
import { GistBox } from '../src'

describe('gist-box', () => {
  beforeEach(() => {
    nock('https://api.github.com')
      .get('/gists/123')
      .reply(200, { files: { example: {} }, description: 'pizza' })
  })

  describe('#get', () => {
    it('gets the Gist', async () => {
      const box = new GistBox({ id: '123', token: '123abc' })
      expect(await box.get()).toEqual(
        expect.objectContaining({
          data: { description: 'pizza', files: { example: {} } }
        })
      )
    })
  })

  describe('#update', () => {
    it('updates the Gist', async () => {
      const scopedNock = nock('https://api.github.com')
        .patch('/gists/123')
        .reply(200, (_, body) => body)

      const box = new GistBox({ id: '123', token: '123abc' })
      const actual = await box.update({ content: 'pizza', description: 'description' })
      expect(actual.data).toEqual({
        description: 'description',
        files: { example: { content: 'pizza', filename: 'example' } }
      })
      expect(scopedNock.isDone()).toBe(true)
    })
  })
})
