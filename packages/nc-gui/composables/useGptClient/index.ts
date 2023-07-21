import type { FetchEventSourceInit } from '@microsoft/fetch-event-source'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import axios from 'axios'
import apis from './apis'
import type { ChatCompletionsResponse, CompletionsResponse, GPTModel, OpenAIModel } from './types'

let baseUrl = apis.baseUrl
const { endpoints } = apis

const client = axios.create({ baseURL: baseUrl })

client.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    const { response } = err
    if (response) {
      const { status, data } = response
      if (status === 401) {
        message.error('please check your openai api key')
      }
      if (status === 429) {
        message.error(data?.error?.message || '请求过于频繁，请稍后再试')
      }
    }
    Promise.reject(err)
  },
)

export function setApiBaseUrl(url: string) {
  client.defaults.baseURL = url
  baseUrl = url
}
export async function completions(
  token: string,
  prompt: string,
  query: string,
  model: Omit<OpenAIModel, GPTModel> = 'text-davinci-003',
  temperature = 0,
  maxTokens = 1000,
) {
  const { url, headers } = endpoints.v1.completions
  const config = {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }
  const body = {
    prompt: `${prompt}:\n\n"${query}" =>`,
    model,
    temperature,
    max_tokens: maxTokens,
    // top_p: 1,
    // frequency_penalty: 1,
    // presence_penalty: 1,
  }
  const response = await client.post<CompletionsResponse>(url, body, config)
  return response
}

export async function chatCompletions(
  token: string,
  prompt: string,
  query: string,
  model: GPTModel = 'gpt-3.5-turbo',
  temperature = 0,
  maxTokens = 1000,
) {
  const { url, headers } = endpoints.v1.chat.completions
  token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJkaHNvLmhhZG9uZ0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci13N1FDMTZLeURPMW5zaU5pNG9OOGNaQlIifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4NDA5Nzk0MjcxNDcyOTM4NDg4IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4OTMwNTE3MiwiZXhwIjoxNjkwNTE0NzcyLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSJ9.bDxqmyyKy9G2xI28YZddiO4grS9w_Lgsr76kJ8aJySJ84eACPXKDaNrIjgvhWDd5lpQ5fvzeoWEh1Gu5bQ3FaWNyq3yL3MFxt2SWat2Kn8oJF9MSsTYWZvUaN4kPRXkpYkf4KoFZOEWjpYWf-xPWDsnGN6RnAl_2djrMEtsfpCTtWKqTiFnwEaK7yuzsKnOZyiohPcS__8aVnhnHT4OvtGAUe6f5ZR3JMCEtMMuHExMVRiaKbExEM5m2PJXpxPBM_lps-pKIoBv28yvgeJilYRrJ6Ep21mge9neeVAd7HQBvI2xHk7AnssGNXhhDkjjW0GkibIX9jivnkrkbuWCloA'
  const config = {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }
  const body = {
    model,
    temperature,
    max_tokens: maxTokens,
    // top_p: 1,
    // frequency_penalty: 1,
    // presence_penalty: 1,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: query },
    ],
  }
  const response = await client.post<ChatCompletionsResponse>(url, body, config)
  return response
}

// !通过{ @microsoft/fetch-event-source } 实现流式输出
export async function chatCompletionsStream(
  params: {
    token: string
    prompt: string
    query: string
    model?: GPTModel
    temperature?: number
    maxTokens?: number
    topP?: number
    frequencyPenalty?: number
    presencePenalty?: number
  },
  options: FetchEventSourceInit,
) {
  const {
    token,
    prompt,
    query,
    model = 'gpt-3.5-turbo',
    temperature = 0,
    maxTokens = 1000,
    topP = 1,
    frequencyPenalty = 1,
    presencePenalty = 1,
  } = params
  const { url, headers } = endpoints.v1.chat.completions

  const body = {
    model,
    temperature,

    max_tokens: maxTokens,

    top_p: topP,

    frequency_penalty: frequencyPenalty,

    presence_penalty: presencePenalty,
    stream: true,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: `"${query}"` },
    ],
  }
  const response = await fetchEventSource(baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    openWhenHidden: true,
    ...options,
  })
  return response
}

export default {
  setApiBaseUrl,
  completions,
  chatCompletions,
  chatCompletionsStream,
}
