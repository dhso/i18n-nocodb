import { GPT_MODELS } from './type'
import type { GPTModel, OpenAIModel } from './type'
import OpenAIClient from './index'

export const fetchTranslation = async (params: {
  token: string
  engine: OpenAIModel
  prompt: string
  tempretureParam: number
  queryText: string
}) => {
  const { token, engine, prompt, queryText, tempretureParam } = params
  if (!token) {
    return message.error('No Openai API Key found!')
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
    .map((choice: any) => choice.text.trim())
    .join('\n')
    .trim()
  return text
}
