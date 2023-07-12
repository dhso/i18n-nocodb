import { XcActionType, XcType } from 'nocodb-sdk';
import DingTalkPlugin from './DingTalkPlugin';
import type { XcPluginConfig } from 'nc-plugin';

const config: XcPluginConfig = {
  builder: DingTalkPlugin,
  title: 'DingTalk',
  version: '0.0.1',
  logo: 'plugins/dingtalk.png',
  description:
    'DingTalk brings team communication and collaboration into one place so you can get more work done, whether you belong to a large enterprise or a small business. ',
  price: 'Free',
  tags: 'Chat',
  category: 'Chat',
  inputs: {
    title: 'Configure DingTalk',
    array: true,
    items: [
      {
        key: 'channel',
        label: 'Channel Name',
        placeholder: 'Channel Name',
        type: XcType.SingleLineText,
        required: true,
      },
      {
        key: 'webhook_url',
        label: 'Webhook URL',
        placeholder: 'Webhook URL',
        type: XcType.SingleLineText,
        required: true,
      },
      {
        key: 'secret',
        label: 'Webhook Secret',
        placeholder: 'Webhook Secret',
        type: XcType.Password,
        required: true,
      },
    ],
    actions: [
      {
        label: 'Test',
        placeholder: 'Test',
        key: 'test',
        actionType: XcActionType.TEST,
        type: XcType.Button,
      },
      {
        label: 'Save',
        placeholder: 'Save',
        key: 'save',
        actionType: XcActionType.SUBMIT,
        type: XcType.Button,
      },
    ],
    msgOnInstall:
      'Successfully installed and DingTalk is enabled for notification.',
    msgOnUninstall: '',
  },
};

export default config;
