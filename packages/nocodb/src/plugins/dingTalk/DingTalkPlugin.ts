import { XcWebhookNotificationPlugin } from 'nc-plugin';
import DingTalk from './DingTalk';
import type { IWebhookNotificationAdapter } from 'nc-plugin';

class DingTalkPlugin extends XcWebhookNotificationPlugin {
  private static notificationAdapter: DingTalk;

  public getAdapter(): IWebhookNotificationAdapter {
    return DingTalkPlugin.notificationAdapter;
  }

  public async init(_config: any): Promise<any> {
    DingTalkPlugin.notificationAdapter = new DingTalk();
    await DingTalkPlugin.notificationAdapter.init();
  }
}

export default DingTalkPlugin;
