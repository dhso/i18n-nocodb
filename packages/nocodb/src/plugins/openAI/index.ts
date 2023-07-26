import { XcActionType, XcType } from 'nocodb-sdk';
import OpenAIPlugin from './OpenAIPlugin';
import type { XcPluginConfig } from 'nc-plugin';

const config: XcPluginConfig = {
  builder: OpenAIPlugin,
  title: 'OpenAI',
  version: '0.0.2',
  logo: 'plugins/openai.png',
  description: 'OpenAI GPT.',
  tags: 'Config',
  inputs: {
    title: 'Configure OpenAI',
    items: [
      {
        key: 'gpt_token',
        label: 'GPT token',
        placeholder: 'GPT token',
        type: XcType.SingleLineText,
        required: true,
      },
      {
        key: 'gpt_model',
        label: 'GPT Model',
        placeholder: 'gpt-3.5-turbo',
        type: XcType.SingleLineText,
        required: false,
      },
      {
        key: 'gpt_base_url',
        label: 'GPT Base Url',
        placeholder: 'https://api.openai.com',
        type: XcType.SingleLineText,
        required: false,
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
    msgOnInstall: 'Successfully installed OpenAI',
    msgOnUninstall: '',
  },
  category: 'Config',
};

export default config;
