import crypto from 'crypto';
import axios from 'axios';
import type { IWebhookNotificationAdapter } from 'nc-plugin';

export default class DingTalk implements IWebhookNotificationAdapter {
  public init(): Promise<any> {
    return Promise.resolve(undefined);
  }

  static sign(secret) {
    const timestamp = Date.now();
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${timestamp}\n${secret}`);
    const sign = encodeURIComponent(hmac.digest('base64'));
    return {
      timestamp,
      sign,
    };
  }

  public async sendMessage(text: string, payload: any): Promise<any> {
    for (const { webhook_url, secret } of payload?.channels) {
      try {
        return await axios.post(
          webhook_url,
          {
            msgtype: 'text',
            text: {
              content: text,
            },
          },
          {
            params: DingTalk.sign(secret),
          },
        );
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
}
