<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { useStorage } from '@vueuse/core'
import { computed, iconMap, useUIPermission } from '#imports'

const { isUIAllowed } = useUIPermission()

const openaiSetting = $ref<any>({ key: '', baseUrl: '', model: '', prompt: '' })
const openaiConfig = {
  openaiApiKey: openaiSetting.key,
  openaiApiBaseUrl: openaiSetting.baseUrl,
  currentModel: '',
  tempretureParam: 0.7,
  prompt: openaiSetting.prompt,
  streamEnabled: false,
}
const storage = useStorage('openaiConfig', openaiConfig)
openaiSetting.key = storage?.value ? storage.value.openaiApiKey : ''
openaiSetting.baseUrl = storage?.value ? storage.value.openaiApiBaseUrl : 'https://api.openai.com'
openaiSetting.model = storage?.value ? storage.value.currentModel : 'gpt-3.5-turbo'
openaiSetting.prompt = storage?.value ? storage.value.prompt : ''

const canOperatePrompt = computed(() => {
  return isUIAllowed('settings') && localStorage.getItem('can-operate-prompt') === 'true'
})

function saveOpenapiConfig() {
  // if (!openaiSetting.key) {
  //   message.warn('Please input your openai api key')
  //   return
  // }

  // if (!openaiSetting.baseUrl) {
  //   message.warn('Please input your openai api url')
  //   return
  // }

  storage.value.openaiApiKey = openaiSetting.key
  storage.value.openaiApiBaseUrl = openaiSetting.baseUrl
  storage.value.currentModel = openaiSetting.model
  storage.value.prompt = openaiSetting.prompt

  setTimeout(() => {
    message.success('save successfully!')
  }, 200)
}

function resetBaseUrl() {
  openaiSetting.baseUrl = 'https://api.openai.com'
  storage.value.openaiApiBaseUrl = openaiSetting.baseUrl
}
</script>

<template>
  <div data-testid="nc-app-settings">
    <div class="mx-auto flex flex-col justify-start gap-2 w-full pl-[auto] max-w-[900px]">
      <div class="text-xl my-4 text-left font-weight-bold">Open AI Settings</div>
      <div>
        <div class="label flex justify-between w-[600px] mb-8px">
          <span>{{ $t('OpenAI API Key') }}</span>
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
        <div class="label flex justify-between w-[600px] mb-8px">
          <a-tooltip placement="right">
            <template #title>
              <span>自定义您的Openai Api代理地址</span>
            </template>
            <span>{{ $t('Proxy Openai Api Url') }}</span>
          </a-tooltip>
          <a class="!no-underline" @click="resetBaseUrl">重置为默认值</a>
        </div>
        <a-form-item class="w-[600px]">
          <a-input
            v-model:value="openaiSetting.baseUrl"
            class="w-[600px]"
            size="large"
            placeholder="Please input your openai api url"
          ></a-input>
        </a-form-item>
        <div class="label flex justify-between w-[600px] mb-8px">模型（引擎）</div>
        <a-form-item class="w-[600px]">
          <a-select v-model:value="openaiSetting.model">
            <a-select-option value="">System built-in</a-select-option>
            <a-select-option value="gpt-3.5-turbo"></a-select-option>
            <a-select-option value="text-davinci-003"></a-select-option>
          </a-select>
        </a-form-item>
        <span v-if="canOperatePrompt">
          <div class="label flex justify-between w-[600px] mb-8px">
            <a-tooltip placement="right">
              <template #title>
                <span>建议按照接口默认提示格式进行修改，否则可能导致文案数据无法自动更新！！！</span>
              </template>
              <span class="flex justify-between content-center">
                <span class="mr-2">Prompt</span>
                <component :is="iconMap.warning" />
              </span>
            </a-tooltip>
          </div>
          <a-form-item class="w-[600px]">
            <a-textarea v-model:value="openaiSetting.prompt" placeholder="adjust your prompt" :auto-size="{ minRows: 2 }" />
          </a-form-item>
        </span>
        <div class="text-left">
          <a-button class="!rounded-md !h-[2.5rem] mt-6" type="primary" html-type="submit" @click="saveOpenapiConfig">
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
