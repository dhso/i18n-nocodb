export interface XcNotification {
  type: XcNotificationType;
  payload: any;
}

export enum XcNotificationType {
  EMAIL = 'Email',
  URL = 'URL',
  DISCORD = 'Discord',
  TELEGRAM = 'Telegram',
  SLACK = 'Slack',
  DINGTALK = 'DingTalk',
  DINGTALKCUSTOM = 'DingTalkCustom',
  WHATSAPP = 'Whatsapp',
  TWILIO = 'Twilio',
}
