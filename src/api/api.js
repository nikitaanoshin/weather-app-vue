class Api {
  constructor(domain) {
    this.domain = domain;
    this.apiKey = 'f86fa0f5411180a0f5e81a608a8da781';
  }

  async makeRequest({ query, system, apiKey }) {
    const response = await fetch(`${this.domain}${query}${system}${apiKey}`);

    if (response.status === 200) return response.json();

    return alert('Something went wrong');
  }

  getCity(cityId) {
    return this.makeRequest({
      query: `?q=${cityId}`,
      system: `&units=metric`,
      apiKey: `&appid=${this.apiKey}`,
    });
  }
}

export default new Api(`https://api.openweathermap.org/data/2.5/weather`);
