import type { FetchEventSourceInit } from '@microsoft/fetch-event-source'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import axios from 'axios'

import apis from './apis'
import type { ChatCompletionsResponse, CompletionsResponse, GPTModel, OpenAIModel } from './types'

let baseUrl = apis.baseUrl
const { endpoints } = apis

const client = axios.create({ baseURL: baseUrl })

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
  topP = 1,
  frequencyPenalty = 1,
  presencePenalty = 1,
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

    top_p: topP,

    frequency_penalty: frequencyPenalty,

    presence_penalty: presencePenalty,
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
  topP = 1,
  frequencyPenalty = 1,
  presencePenalty = 1,
) {
  const { url, headers } = endpoints.v1.chat.completions
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

    top_p: topP,

    frequency_penalty: frequencyPenalty,

    presence_penalty: presencePenalty,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: `"${query}"` },
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
