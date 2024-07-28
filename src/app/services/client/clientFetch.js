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
    }).then((resp) => {
      const contentType = resp?.headers.get('Content-Type')
      let response = resp.json()
      if (contentType.includes('application/json') && resp.ok) {
        return response
      }

      throw new Error(response)
    })
  }
}

export default FetchClient
