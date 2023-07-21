export default {
  // baseUrl: 'https://api.openai.com',
  baseUrl: 'https://askme-api.minws.com/imitate/',
  endpoints: {
    v1: {
      completions: {
        url: '/v1/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      chat: {
        completions: {
          url: '/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      },
    },
  },
}
