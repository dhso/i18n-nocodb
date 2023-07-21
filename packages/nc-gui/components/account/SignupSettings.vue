<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { useStorage } from '@vueuse/core'
import { extractSdkResponseErrorMsg, useApi } from '#imports'
const { api } = useApi()

const { t } = useI18n()

let settings = $ref<{ invite_only_signup?: boolean }>({ invite_only_signup: false })
const loadSettings = async () => {
  try {
    const response = await api.orgAppSettings.get()
    settings = response
  } catch (e: any) {
    message.error(await extractSdkResponseErrorMsg(e))
  }
}
const saveSettings = async () => {
  try {
    await api.orgAppSettings.set(settings)
    message.success(t('msg.success.settingsSaved'))
  } catch (e: any) {
    message.error(await extractSdkResponseErrorMsg(e))
  }
}

loadSettings()

const openaiSetting = $ref<{ key: string }>({ key: '' })
const openaiConfig = {
  openaiApiKey: openaiSetting.key,
  streamEnabled: false,
  currentModel: 'gpt-3.5-turbo',
  tempretureParam: 0.7,
}
const storage = useStorage('openaiConfig', openaiConfig)
openaiSetting.key = storage?.value ? storage.value.openaiApiKey : ''

function saveOpenapiKey() {
  if (!openaiSetting.key) {
    message.warn('Please input your openai api key')
    return
  }
  storage.value.openaiApiKey = openaiSetting.key

  setTimeout(() => {
    message.success('save successfully!')
  }, 200)
}
</script>

<template>
  <div data-testid="nc-app-settings">
    <div class="mx-auto flex flex-col justify-start gap-2 w-full pl-[auto] max-w-[900px]">
      <div class="text-xl my-4 text-left font-weight-bold">Settings</div>
      <div>
        <!-- <a-form-item>
          <a-checkbox
            v-model:checked="settings.invite_only_signup"
            v-e="['c:account:enable-signup']"
            class="nc-checkbox nc-invite-only-signup-checkbox"
            name="virtual"
            @change="saveSettings"
          >
            {{ $t('labels.inviteOnlySignup') }}
          </a-checkbox>
        </a-form-item> -->
        <div class="label flex justify-between w-[600px] mb-8px">
          <span>{{ $t('OpenAI API Key:') }}</span>
          <a href="https://platform.openai.com/account/api-keys" target="_blank">获取您的OpenAI Key</a>
        </div>
        <a-form-item class="w-[600px] !h-[2.5rem]">
          <a-input
            v-model:value="openaiSetting.key"
            class="w-[600px]"
            size="large"
            placeholder="please input your openai api key"
          ></a-input>
        </a-form-item>
        <div class="text-left">
          <a-button class="!rounded-md !h-[2.5rem] mt-6" type="primary" html-type="submit" @click="saveOpenapiKey">
            Submit
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-checkbox-wrapper) {
  @apply !flex-row-reverse !flex !justify-start gap-4;
  justify-content: flex-start;
}
</style>
