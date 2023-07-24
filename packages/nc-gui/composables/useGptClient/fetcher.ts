// @ts-nocheck
import { useStorage } from '@vueuse/core'
import { GPT_MODELS } from './type'
import type { GPTModel } from './type'
import OpenAIClient from './index'

/**
 * @description get openai setting from localstorage
 * @returns { token: string, engine: string, tempretureParam: number }
 */
export function getOpenaiSetting() {
  const storage = useStorage('openaiConfig', null)
  const { openaiApiKey, openaiApiBaseUrl, currentModel, tempretureParam } =
    storage && storage?.value ? JSON.parse(storage.value) : ({} as any)

  // reset baseUrl
  OpenAIClient.setApiBaseUrl(openaiApiBaseUrl || 'https://api.openai.com')
  return { token: openaiApiKey, engine: currentModel, tempretureParam }
}

export const fetchTranslation = async (params: { prompt: string; queryText: string }) => {
  const { token, engine, tempretureParam } = getOpenaiSetting()
  const { prompt, queryText } = params
  if (!token) {
    return message.error('No Openai API Key found! Please check your Openai API Key in user setting.')
  }

  const getRadomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  const isGptModel = (GPT_MODELS as unknown as string[]).includes(engine)

  const tmpParam = +tempretureParam > 0.4 && +tempretureParam <= 1.0 ? +tempretureParam : getRadomNumber(0.5, 1.0)

  if (isGptModel) {
    const resp = await OpenAIClient.chatCompletions(token, prompt, queryText, engine as GPTModel, tmpParam)
    const text = resp.data.choices
      .map((choice: any) => (choice.message?.content || '').trim())
      .join('\n')
      .trim()
    return text
  }

  const resp = await OpenAIClient.completions(token, prompt, queryText, engine, tmpParam)
  const text = resp.data.choices
    .map((choice: any) => (choice?.text || choice?.message?.content || '').trim())
    .join('\n')
    .trim()
  return text
}
