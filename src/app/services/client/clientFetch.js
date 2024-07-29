import APIError from '@/app/errors/APIError'

class FetchClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async post(endpoint, options) {
    return this.request(endpoint, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers
    })
  }

  async request(path, options) {
    const headers = new Headers()

    if (options.body) {
      headers.append('Content-Type', 'application/json')
    }

    if (options?.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value)
      })
    }

    return fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers
    }).then(async (resp) => {
      const contentType = resp?.headers.get('Content-Type')
      let response = null

      if (contentType.includes('application/json')) {
        response = await resp.json()
      }

      if (resp.ok) {
        return response
      }

      throw new APIError(resp, response)
    })
  }
}

export default FetchClient
