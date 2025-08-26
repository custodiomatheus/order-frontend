import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import OrderCard from '@/components/Order/OrderCard.vue'
import BaseIconText from '@/components/BaseIconText.vue'

function buildComponent(props = {}) {
  const defaults = {
    label: 'Customer',
    name: 'Acme Corp',
    code: 'ABC123',
    address: '742 Evergreen Terrace',
    contact: { name: 'John Doe', email: 'john@acme.com', phone: '+1 555-1234', fax: '+1 555-9876' },
    readAt: '2025-08-20 12:00',
    document: { type: 'CNPJ', value: '12.345.678/0001-99' },
  }

  return mount(OrderCard, {
    props: { ...defaults, ...props },
    global: {
      stubs: {
        BaseIconText: BaseIconText,
      },
    },
  })
}

describe('OrderCard.vue', () => {
  it('renders label and name', () => {
    const wrapper = buildComponent({ label: 'Supplier', name: 'Globex' })

    expect(wrapper.get('p.text-neutral-500.text-xs').text()).toBe('Supplier')
    expect(wrapper.get('h5.text-neutral-700.text-sm.font-bold').text()).toContain('Globex')
  })

  it('renders code badge when "code" is provided', () => {
    const wrapper = buildComponent({ code: 'ZX9' })
    const badge = wrapper.get('span.text-primary-500')

    expect(badge.text()).toBe('#ZX9')
  })

  it('does not render code badge when "code" is empty', () => {
    const wrapper = buildComponent({ code: '' })

    expect(wrapper.find('span.text-primary-500').exists()).toBe(false)
  })

  it('renders document line when document.type and value are provided', () => {
    const wrapper = buildComponent({ document: { type: 'CNPJ', value: '00.000.000/0001-00' } })
    const textNodes = wrapper.findAll('[data-test="bit-text"]').map((n) => n.text())

    expect(textNodes).toContain('CNPJ 00.000.000/0001-00')
  })

  it('does not render document line when only document.type is provided', () => {
    const wrapper = buildComponent({ document: { type: 'CPF', value: '' } })

    const docText = wrapper
      .findAll('[data-test="bit-text"]')
      .map((n) => n.text())
      .find((t) => /^CPF(\s|$)/.test(t))

    expect(docText).toBeUndefined()
  })

  it('does not render document line when type and value are both empty', () => {
    const wrapper = buildComponent({ document: { type: '', value: '' } })

    const docRow = wrapper
      .findAllComponents(BaseIconText)
      .find(
        (c) =>
          c.find('[data-test="bit-text"]').text().startsWith('CPF') ||
          c.find('[data-test="bit-text"]').text().includes('CNPJ'),
      )
    expect(docRow).toBeUndefined()
  })

  it('renders address when provided', () => {
    const wrapper = buildComponent({ address: '221B Baker Street' })
    const texts = wrapper.findAll('[data-test="bit-text"]').map((n) => n.text())

    expect(texts).toContain('221B Baker Street')
  })

  it('renders contact fields conditionally (name, email, phone, fax)', () => {
    const contact = { name: 'Jane', email: 'jane@globex.com', phone: '555-7777', fax: '555-8888' }
    const wrapper = buildComponent({ contact })
    const texts = wrapper.findAll('[data-test="bit-text"]').map((n) => n.text())

    expect(texts).toContain(contact.name)
    expect(texts).toContain(contact.email)
    expect(texts).toContain(contact.phone)
    expect(texts).toContain(contact.fax)
  })

  it('does not render optional contact rows when values are empty', () => {
    const wrapper = buildComponent({ contact: { name: '', email: '', phone: '', fax: '' } })
    const texts = wrapper.findAll('[data-test="bit-text"]').map((n) => n.text())

    expect(texts).not.toContain('')
  })

  it('renders readAt row with Eye icon when provided', () => {
    const wrapper = buildComponent({ readAt: '2025-08-26 09:00' })
    const texts = wrapper.findAll('[data-test="bit-text"]').map((n) => n.text())

    expect(texts).toContain('2025-08-26 09:00')
  })

  it('matches basic structure classes', () => {
    const wrapper = buildComponent()
    const root = wrapper.get('div.rounded-lg')

    expect(root.classes()).toContain('p-4')
    expect(root.classes().some((c) => c.startsWith('shadow-'))).toBe(true)
  })
})
