export const GPT_MODELS = [
  'gpt-3.5-turbo-0613',
  'gpt-3.5-turbo-0301',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-16k-0613',
  'gpt-4',
  'gpt-4-0314',
  'gpt-4-0614',
  'gpt-4-32k',
  'gpt-4-32k-0314',
  'gpt-4-32k-0614',
] as const

export const OPENAI_MODELS = [...GPT_MODELS, 'text-davinci-003', 'text-davinci-002'] as const

export type GPTModel = typeof GPT_MODELS[number]
export type OpenAIModel = typeof OPENAI_MODELS[number]

export const OPENAI_MODELS_TITLES: Record<OpenAIModel, string> = {
  'text-davinci-003': 'text-davinci-003',
  'text-davinci-002': 'text-davinci-002',
  'gpt-3.5-turbo-0613': 'gpt-3.5-turbo-0613',
  'gpt-3.5-turbo-0301': 'gpt-3.5-turbo-0301',
  'gpt-3.5-turbo': 'gpt-3.5-turbo (recommended)',
  'gpt-3.5-turbo-16k': 'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-16k-0613': 'gpt-3.5-turbo-16k-0613',
  'gpt-4': 'gpt-4',
  'gpt-4-0314': 'gpt-4-0314',
  'gpt-4-0614': 'gpt-4-0614',
  'gpt-4-32k': 'gpt-4-32k (testing)',
  'gpt-4-32k-0314': 'gpt-4-32k-0314 (testing)',
  'gpt-4-32k-0614': 'gpt-4-32k-0614 (testing)',
} as const

export const OPENAI_MODELS_DESCRIPTION: Record<OpenAIModel, string> = {
  'text-davinci-003': 'Text Davinci 003',
  'text-davinci-002': 'Text Davinci 002',
  'gpt-3.5-turbo-0613': 'GPT-3.5 Turbo 0613',
  'gpt-3.5-turbo-0301': 'GPT-3.5 Turbo 0301',
  'gpt-3.5-turbo': 'GPT-3.5 Turbo',
  'gpt-3.5-turbo-16k': 'GPT-3.5 Turbo 16K',
  'gpt-3.5-turbo-16k-0613': 'GPT-3.5 Turbo 16K 0613',
  'gpt-4': 'GPT-4',
  'gpt-4-0314': 'GPT-4 0314',
  'gpt-4-0614': 'GPT-4 0614',
  'gpt-4-32k': 'GPT-4 32K',
  'gpt-4-32k-0314': 'GPT-4 32K 0314',
  'gpt-4-32k-0614': 'GPT-4 32K 0614',
} as const
