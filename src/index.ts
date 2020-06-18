import { request } from '@octokit/request'

export interface GistBoxOptions {
  /**
   * The ID of the Gist
   */
  id: string
  /**
   * A GitHub API token to authenticate with
   */
  token: string
}

export interface Updates {
  filename?: string
  content?: string
  description?: string
}

/**
 * The maximum number of characters in a pinned Gist line
 */
export const MAX_LENGTH = 63
/**
 * The maximum number of lines in a pinned Gist
 */
export const MAX_LINES = 5
/**
 * The maximum width of a pinned Gist image
 */
export const MAX_WIDTH = 325
/**
 * The maximum height of a pinned Gist image
 */
export const MAX_HEIGHT = 100

export class GistBox {
  public id: string
  private token: string

  constructor ({ id, token }: GistBoxOptions) {
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
    const defaultContent = gist.data.files[filename].content || ''
    return request('PATCH /gists/:gist_id', {
      files: { [filename]: {
        content: updates.content || defaultContent,
        filename: updates.filename || filename
      }},
      description: updates.description || gist.data.description,
      gist_id: this.id,
      headers: {
        authorization: `token ${this.token}`
      }
    })
  }
}
