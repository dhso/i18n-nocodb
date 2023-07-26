<script setup lang="ts">
import { debounce } from 'lodash-es'
import { ActiveViewInj, MetaInj, iconMap, inject, ref, useSmartsheetStoreOrThrow, useViewData } from '#imports'

const emit = defineEmits(['translateRows'])

const meta = inject(MetaInj, ref())

const view = inject(ActiveViewInj, ref())

const { xWhere } = useSmartsheetStoreOrThrow()

const { isLoading } = useViewData(meta, view, xWhere)

const debounceTranslate = debounce(() => emit('translateRows'), 300)

// const open = ref(false)
// const checkedList = ref([])
// const plainOptions = ref(['CN', 'EN', 'TW', 'JP'])
// const radioValue = ref('CN')

// const disabledChange = computed(() => {
//   return checkedList.value?.length < 1
// })

// const translateSetting = {
//   translateType: ['EN', 'TW', 'JP'],
//   translateSourceType: 'CN',
// }
// const storage = useStorage('translateSetting', translateSetting)
// const onTranslateTypeChange = () => {
//   if (disabledChange.value) {
//     return (checkedList.value = storage.value.translateType)
//   }
//   storage.value.translateType = checkedList.value
// }
// const onSourceTypeChange = () => {
//   storage.value.translateSourceType = radioValue.value
// }
// onMounted(() => {
//   checkedList.value = storage.value.translateType
//   radioValue.value = storage.value.translateSourceType
// })
</script>

<template>
  <a-button v-e="['c:sort']" class="nc-sort-menu-btn nc-toolbar-btn" :disabled="isLoading" @click="debounceTranslate">
    <div class="flex items-center gap-1">
      <component :is="iconMap.translate" />
      <span class="text-capitalize !text-xs font-weight-normal">{{ $t('GPT Translation') }}</span>
      <!-- <a-dropdown
        v-model:visible="open"
        offset-y
        placement="bottomRight"
        :trigger="['hover']"
        overlay-class-name="nc-dropdown-gpt-translation"
      >
        <a-tooltip placement="right">
          <template #title>
            <span>设置需要翻译的语言类型</span>
          </template>
          <component :is="iconMap.settings" @click.stop />
        </a-tooltip>
        <template #overlay>
          <div
            class="bg-gray-50 p-6 shadow-lg menu-filter-dropdown max-h-[max(80vh,500px)] overflow-auto !border"
            data-testid="nc-sorts-menu"
          >
            <p class="font-semibold">翻译源语言：</p>
            <a-radio-group v-model:value="radioValue" @change="onSourceTypeChange">
              <a-radio value="CN">CN</a-radio>
              <a-radio value="EN">EN</a-radio>
            </a-radio-group>
            <p class="font-semibold">需要翻译的字段：</p>
            <a-checkbox-group v-model:value="checkedList" :options="plainOptions" @change="onTranslateTypeChange" />
          </div>
        </template>
      </a-dropdown> -->
    </div>
  </a-button>
</template>

<style lang="scss">
.nc-dropdown-gpt-translation {
  .ant-dropdown-content {
    margin-top: 6px;
    margin-right: -8px;

    p {
      margin-top: 12px;
      margin-bottom: 4px;
    }
  }
}
</style>
