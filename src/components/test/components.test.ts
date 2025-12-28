import { test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import CpRadioBtn from '../CpRadioBtn.vue'

test('CpRadioBtn', async () => {
  // 1.单独挂载组件
  const wrapper = render(CpRadioBtn, {
    props: {
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' }
      ],
      modelValue: '1'
    }
  })

  // console.log(wrapper.html())
  // 2.测试组件是否正确渲染
  wrapper.getByText('Option 1')
  wrapper.getByText('Option 2')

  // 3.测试 props
  expect(wrapper.queryByText('Option 1')?.classList.contains('active')).toBe(
    true
  )

  // 4.测试自定义事件 update:modelValue
  wrapper.queryByText('Option 1')?.click()
  console.log(wrapper.emitted('update:modelValue'))
  expect(wrapper.emitted('update:modelValue')[0]).toEqual(['1'])
  // 更新props
  await wrapper.rerender({ modelValue: '2' })
  expect(wrapper.queryByText('Option 2')?.classList.contains('active')).toBe(
    true
  )
})
