import nock from 'nock'
import { GistBox } from '../src'

describe('gist-box', () => {
  beforeEach(() => {
    nock('https://api.github.com')
      .get('/gists/123')
      .reply(200, { files: { example: { description: 'pizza' } } })
  })

  describe('#get', () => {
    it('gets the Gist', async () => {
      const box = new GistBox({ id: '123', token: '123abc' })
      expect(await box.get()).toEqual(
        expect.objectContaining({
          data: { files: { example: { description: 'pizza' } } }
        })
      )
    })
  })

  describe('#update', () => {
    it('updates the Gist', async () => {
      const scopedNock = nock('https://api.github.com')
        .patch('/gists/123')
        .reply(200, (_: string, body: string) => JSON.parse(body))

      const box = new GistBox({ id: '123', token: '123abc' })
      const actual = await box.update({ content: 'pizza' })
      expect(actual.data).toEqual({ files: { example: { content: 'pizza' } } })
      expect(scopedNock.isDone()).toBe(true)
    })
  })
})
