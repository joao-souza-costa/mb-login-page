import FetchClient from './client/clientFetch'

class AuthService {
  constructor() {
    this.client = new FetchClient('http://localhost:3000')
  }

  async createUser(body) {
    return this.client.post('/registration', { body })
  }
}

export default new AuthService()
