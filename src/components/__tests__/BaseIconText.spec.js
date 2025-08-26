import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BaseIconText from '@/components/BaseIconText.vue'

describe('BaseIconText.vue', () => {
  it('renders the provided text prop', () => {
    const wrapper = mount(BaseIconText, {
      props: { text: 'Hello World' },
    })

    const span = wrapper.get('span')
    expect(span.text()).toBe('Hello World')
    expect(wrapper.get('div').classes()).toContain('flex')
    expect(span.classes()).toContain('text-neutral-500')
    expect(span.classes()).toContain('text-xs')
  })

  it('renders the "icon-left" slot when provided', () => {
    const wrapper = mount(BaseIconText, {
      props: { text: 'With left icon' },
      slots: {
        'icon-left': '<i data-test="left" />',
      },
    })

    expect(wrapper.find('[data-test="left"]').exists()).toBe(true)
  })

  it('renders the "icon-right" slot when provided', () => {
    const wrapper = mount(BaseIconText, {
      props: { text: 'With right icon' },
      slots: {
        'icon-right': '<i data-test="right" />',
      },
    })

    expect(wrapper.find('[data-test="right"]').exists()).toBe(true)
  })

  it('does not render slots if they are not provided', () => {
    const wrapper = mount(BaseIconText, {
      props: { text: 'No slots' },
    })

    expect(wrapper.find('[data-test="left"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="right"]').exists()).toBe(false)
  })

  it('updates the DOM when the "text" prop changes', async () => {
    const wrapper = mount(BaseIconText, {
      props: { text: 'Before' },
    })

    expect(wrapper.get('span').text()).toBe('Before')
    await wrapper.setProps({ text: 'After' })
    expect(wrapper.get('span').text()).toBe('After')
  })
})
