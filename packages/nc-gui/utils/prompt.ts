/* eslint-disable prettier/prettier */
export const LANGUAGES = {
  'CN': '简体中文',
  'TW': '繁體中文',
  'EN': '英语',
  'JP': '日本語',
} as const

export type E_Language = keyof typeof LANGUAGES;

export enum E_TranslateType {
  SINGLE = 'SINGLE',
  BATCH = 'BATCH',
}

export const getTranslatePrompt = (isSimpleText = true, toLang: E_Language|E_Language[] = ['CN','EN','JP','TW'], ) => {
  const cachePrompt = localStorage.getItem('openaiConfig') ? JSON.parse(localStorage.getItem('openaiConfig') as string)?.prompt : null
  if(Array.isArray(toLang)) {
    // !统一数据集处理
    if(!isSimpleText) {
      return cachePrompt || `
        你是一个专业的翻译引擎，
        给到你的是一个数组，数组成员是单个的对象，每个对象都有一个'''Origin'''字段。
        需要你针对数组的字段进行翻译处理，要求如下：
        '''
          1. 在数组中针对'''Origin'''字段分别翻译成'''简体中文、英文、繁体中文、日文'''。
          2. 只需要输出一个你认为最精确的翻译结果，不需要额外的说明语言。
          3. 每个对象新增'''CN、EN、JP、TW'''字段来表示分别表示翻译成'''简体中文、英文、繁体中文、日文'''的结果。
        '''
        输出的数据格式如下:
        '''[{
          "Id": 1,
          "CN": "简体中文",
          "EN": "英语",
          "JP": "日本語",
          "TW": "繁體中文",
        }, {
          "Id": 1,
          "CN": "简体中文",
          "EN": "英语",
          "JP": "日本語",
          "TW": "繁體中文",
        }]'''
        注意：只需输出上述格式内容，不需要额外的说明文字！
      `
    }
    // !单行批量处理
    return cachePrompt || `
      你是一个专业的翻译引擎，
      请将给到的文本翻译成'''简体中文、繁体中文、英文、日文'''，
      只需要输出一个你认为最精确的翻译结果，
      输出结果以'''CN、EN、JP、TW'''作为key的'''json对象'''表示，
      输出结果格式样例如下：
      '''{
        "CN": "简体中文",
        "EN": "英语",
        "JP": "日本語",
        "TW": "繁體中文",
      }'''
      注意：只需要输出'''json'''对象，不需要额外的说明语言。
    `
  }
  return cachePrompt || `
    你是一名翻译引擎，
    请将给到的文本翻译成${LANGUAGES[toLang]}，
    只需要输出一个你认为最精确的翻译结果，不需要额外的说明语言。
  `
}
