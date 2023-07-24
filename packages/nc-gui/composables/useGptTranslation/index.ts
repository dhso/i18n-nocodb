import { useStorage } from '@vueuse/core'

export default function useGptTranslation() {
  const translateSetting = ref({
    translateType: ['EN', 'TW', 'JP'],
    translateSourceType: 'CN',
  })

  const openaiConfig = ref({
    openaiApiKey: '',
    streamEnabled: false,
    currentModel: 'gpt-3.5-turbo',
    tempretureParam: 0.7,
  })

  const setOpenaiConfig = () => {
    useStorage('openaiConfig', openaiConfig)
  }

  const getOpenaiConfig = () => {
    const storage = useStorage('openaiConfig', openaiConfig)
    return storage.value
  }

  const setTranslateSetting = () => {
    useStorage('translateSetting', translateSetting)
  }

  const getTranslateSetting = () => {
    const storage = useStorage('translateSetting', translateSetting)
    return storage.value
  }
  return {
    setOpenaiConfig,
    getOpenaiConfig,
    setTranslateSetting,
    getTranslateSetting,
  }
}
