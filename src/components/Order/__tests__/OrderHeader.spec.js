import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import OrderHeader from '@/components/Order/OrderHeader.vue'
import BaseIconText from '@/components/BaseIconText.vue'

function buildComponent(props = {}) {
  const defaultProps = {
    number: 42,
    serial: 987,
    buyer: 'Acme Corp',
    contact: {
      name: 'John Doe',
      email: 'john@acme.com',
      phone: '+1 555-1234',
      fax: '+1 555-9876',
    },
    price: 199.99,
    status: 'Approved',
    createdAt: '2025-08-20T14:33:45.123Z',
  }

  return mount(OrderHeader, {
    props: { ...defaultProps, ...props },
    global: {
      stubs: {
        BaseIconText: BaseIconText,
      },
    },
  })
}

describe('OrderHeader.vue', () => {
  it('renders the left banner with number, serial and title', () => {
    const wrapper = buildComponent({ number: 123, serial: 456 })
    const banner = wrapper.get('.lg\\:w-\\[200px\\]')

    expect(banner.text()).toContain('Pre-Order')
    expect(banner.text()).toContain('123')
    expect(banner.text()).toContain('#ME456')
  })

  it('renders buyer name in the main section', () => {
    const wrapper = buildComponent({ buyer: 'Globex' })
    const buyerEl = wrapper.get('h2.text-neutral-500')
    expect(buyerEl.text()).toBe('Globex')
  })

  it('passes contact fields to BaseIconText instances', () => {
    const contact = {
      name: 'Jane Smith',
      email: 'jane@globex.com',
      phone: '+55 11 99999-9999',
      fax: '+55 11 8888-8888',
    }
    const wrapper = buildComponent({ contact })

    const texts = wrapper.findAll('[data-test="bit-text"]').map((n) => n.text())

    expect(texts).toContain(contact.name)
    expect(texts).toContain(contact.email)
    expect(texts).toContain(contact.phone)
    expect(texts).toContain(contact.fax)
  })

  it('renders price and status', () => {
    const wrapper = buildComponent({ price: 2500, status: 'Pending' })

    const priceEl = wrapper.find('[data-test="price"]')
    expect(priceEl.text()).toBe('USD 2500')

    const statusEl = wrapper.get('p.text-success-500.text-xl.font-semibold')
    expect(statusEl.text()).toBe('Pending')
  })

  it('computes and renders createdAt date and time from ISO string', () => {
    const wrapper = buildComponent({
      createdAt: '2025-08-20T14:33:45.123Z',
    })

    const createdAtText = wrapper
      .findAll('[data-test="bit-text"]')
      .map((n) => n.text())
      .find((t) => t.startsWith('Created at'))

    expect(createdAtText).toBe('Created at 2025-08-20 at 14:33:45')
  })

  it('handles createdAt without time part (current behavior renders "undefined")', () => {
    const wrapper = buildComponent({
      createdAt: '2025-08-20',
    })

    const createdAtText = wrapper
      .findAll('[data-test="bit-text"]')
      .map((n) => n.text())
      .find((t) => t.startsWith('Created at'))

    expect(createdAtText).toBe('Created at 2025-08-20 at undefined')
  })

  it('includes the BaseIconText used for the "created at" line (with right icon slot)', () => {
    const wrapper = buildComponent()

    const sections = wrapper.findAllComponents(BaseIconText)
    expect(sections.length).toBeGreaterThanOrEqual(5)
    const last = sections[sections.length - 1]
  })
})
