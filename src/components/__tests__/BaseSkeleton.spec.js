import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BaseSkeleton from '@/components/BaseSkeleton.vue'

describe('BaseSkeleton.vue', () => {
  it('renders as a div with base classes', () => {
    const wrapper = mount(BaseSkeleton)
    const el = wrapper.get('div')
    const classes = el.classes()

    expect(el.exists()).toBe(true)
    expect(classes).toContain('relative')
    expect(classes).toContain('overflow-hidden')
    expect(classes).toContain('skeleton-shimmer')
    expect(classes).toContain('bg-gray-200')
    expect(classes).toContain('dark:bg-gray-300')
  })

  it('applies default radius style (8px) when no radius is provided', () => {
    const wrapper = mount(BaseSkeleton)
    const el = wrapper.get('div').element

    expect(el.style.borderRadius).toBe('8px')
  })

  it('applies width/height/radius styles (number => px, string preserved)', () => {
    const wrapper = mount(BaseSkeleton, {
      props: {
        width: 120,
        height: '2rem',
        radius: 12,
      },
    })
    const el = wrapper.get('div').element

    expect(el.style.width).toBe('120px')
    expect(el.style.height).toBe('2rem')
    expect(el.style.borderRadius).toBe('12px')
  })

  it('does not set width/height styles when not provided', () => {
    const wrapper = mount(BaseSkeleton, { props: { radius: 10 } })
    const el = wrapper.get('div').element

    expect(el.style.width).toBe('')
    expect(el.style.height).toBe('')
    expect(el.style.borderRadius).toBe('10px')
  })

  it('does not set border-radius when radius is explicitly null', () => {
    const wrapper = mount(BaseSkeleton, { props: { radius: null } })
    const el = wrapper.get('div').element

    expect(el.style.borderRadius).toBe('')
  })

  it('merges custom classes via "className" prop', () => {
    const wrapper = mount(BaseSkeleton, {
      props: { className: 'my-custom-class another-one' },
    })

    const classes = wrapper.get('div').classes()
    expect(classes).toContain('my-custom-class')
    expect(classes).toContain('another-one')
  })

  it('adds shimmer class regardless of the "animated" prop (current behavior)', () => {
    const w1 = mount(BaseSkeleton, { props: { animated: true } })
    const w2 = mount(BaseSkeleton, { props: { animated: false } })

    expect(w1.get('div').classes()).toContain('skeleton-shimmer')
    expect(w2.get('div').classes()).toContain('skeleton-shimmer')
  })

  it('is marked as aria-hidden', () => {
    const wrapper = mount(BaseSkeleton)

    expect(wrapper.get('div').attributes('aria-hidden')).toBe('true')
  })
})
