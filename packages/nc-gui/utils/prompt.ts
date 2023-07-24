/* eslint-disable prettier/prettier */
export const LANGUAGES = {
  'CN': '简体中文',
  'TW': '繁體中文',
  'EN': '英语',
  'JP': '日本語',
} as const

export type E_Language = keyof typeof LANGUAGES;

export const getTranslatePrompt = (fromLang: E_Language = 'CN', toLang: E_Language|E_Language[] = 'TW', isSimpleText = true) => {
  if(Array.isArray(toLang)) {
    if(!isSimpleText) {
      return `
        你是一个擅长专业的翻译引擎，
        给到你的是一个数组，数组里面包含多个对象，每个对象都有一个${fromLang}字段。
        你需要对数组的字段进行翻译处理，要求如下：
        '''
          在数组中针对'''${fromLang}'''字段分别翻译成${toLang.map(lang => LANGUAGES[lang]).join('、')}，以'''${toLang.join('、')}'''表示
        '''
        输出的数据格式如下:
        '''[{
          "Id": 1,
          "CN": "简体中文",
          "TW": "繁體中文",
        }, {
          "Id": 1,
          "CN": "简体中文",
          "TW": "繁體中文",
        }]'''
        注意：只需输出上述格式内容，不需要额外的说明文字！TW表示的就是${fromLang}字段翻译成繁体中文的内容。
      `
    }
    return `
      你是一名翻译引擎，
      请将给到的文本翻译成${toLang.map(lang => LANGUAGES[lang]).join('、')}，
      只需要输出一个你认为最精确的翻译结果，
      输出结果以${toLang}作为key的'''json对象'''形式表示，
      输出的格式样例如下：
      '''{
        "TW": "繁體中文",
      }'''
      TW表示的就是${fromLang}字段翻译成繁体中文的内容。
      只需要输出'''json'''对象，不需要额外的说明语言。
    `
  }
  return `
    你是一名翻译引擎，
    请将给到的文本翻译成${LANGUAGES[toLang]}，
    只需要输出一个你认为最精确的翻译结果，不需要额外的说明语言。
  `
}
