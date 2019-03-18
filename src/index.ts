import request from '@octokit/request'

export interface Updates {
  filename?: string
  content?: string
  description?: string
}

/**
 * The maximum number of characters in a pinned Gist line
 */
export const MAX_LENGTH = 46
/**
 * The maximum number of lines in a pinned Gist
 */
export const MAX_LINES = 5

export class GistBox {
  public id: string
  private token: string

  constructor (id: string, token: string) {
    this.id = id
    this.token = token
  }

  /**
   * Get the Gist
   */
  public async get () {
    return request('GET /gists/:gist_id', {
      gist_id: this.id,
      headers: {
        authorization: `token ${this.token}`
      }
    })
  }

  /**
   * Update the Gist
   */
  public async update (updates: Updates) {
    const gist = await this.get()
    const filename = Object.keys(gist.data.files)[0]
    return request('PATCH /gists/:gist_id', {
      gist_id: this.id,
      [filename]: updates,
      headers: {
        authorization: `token ${this.token}`
      }
    })
  }
}
