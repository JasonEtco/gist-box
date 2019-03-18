declare module '@octokit/request' {
  export interface Response {
    data: { [ key: string ]: any }
  }

  export default function request (url: string, options: any): Promise<Response>
}
