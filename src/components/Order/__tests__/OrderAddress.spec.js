import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import OrderAddress from '@/components/Order/OrderAddress.vue'
import OrderCard from '@/components/Order/OrderCard.vue'

function buildComponent(props = {}) {
  const defaults = {
    addresses: [
      {
        label: 'Billing',
        name: 'Acme Corp',
        code: 'ACM-1',
        address: '742 Evergreen Terrace',
        contact: { name: 'John', email: 'john@acme.com', phone: '555-1234', fax: '555-9876' },
      },
      {
        label: 'Shipping',
        name: 'Globex',
        code: 'GBX-9',
        address: '221B Baker Street',
        contact: { name: 'Jane', email: 'jane@globex.com', phone: '555-7777', fax: '555-8888' },
      },
    ],
  }

  return mount(OrderAddress, {
    props: { ...defaults, ...props },
  })
}

describe('OrderAddress.vue', () => {
  it('renders the header title "Addresses"', () => {
    const wrapper = buildComponent()
    const header = wrapper.get('h4')

    expect(header.text()).toContain('Addresses')
  })

  it('renders one OrderCard per address', () => {
    const wrapper = buildComponent()
    const cards = wrapper.findAllComponents(OrderCard)

    expect(cards).toHaveLength(2)
  })

  it('passes the correct props to each OrderCard', () => {
    const wrapper = buildComponent()
    const cards = wrapper.findAllComponents(OrderCard)

    expect(cards[0].props()).toEqual(
      expect.objectContaining({
        label: 'Billing',
        name: 'Acme Corp',
        code: 'ACM-1',
        address: '742 Evergreen Terrace',
        contact: expect.objectContaining({
          name: 'John',
          email: 'john@acme.com',
          phone: '555-1234',
          fax: '555-9876',
        }),
      }),
    )

    expect(cards[1].props()).toEqual(
      expect.objectContaining({
        label: 'Shipping',
        name: 'Globex',
        code: 'GBX-9',
        address: '221B Baker Street',
        contact: expect.objectContaining({
          name: 'Jane',
          email: 'jane@globex.com',
          phone: '555-7777',
          fax: '555-8888',
        }),
      }),
    )
  })

  it('renders no OrderCard when addresses is empty', () => {
    const wrapper = buildComponent({ addresses: [] })

    expect(wrapper.findAllComponents(OrderCard)).toHaveLength(0)
  })

  it('updates the list when the addresses prop changes', async () => {
    const wrapper = buildComponent({ addresses: [] })
    expect(wrapper.findAllComponents(OrderCard)).toHaveLength(0)

    await wrapper.setProps({
      addresses: [
        {
          label: 'Billing',
          name: 'Acme Corp',
          code: 'ACM-1',
          address: '742 Evergreen Terrace',
          contact: { name: 'John', email: 'john@acme.com', phone: '555-1234', fax: '555-9876' },
        },
        {
          label: 'Shipping',
          name: 'Globex',
          code: 'GBX-9',
          address: '221B Baker Street',
          contact: { name: 'Jane', email: 'jane@globex.com', phone: '555-7777', fax: '555-8888' },
        },
        {
          label: 'HQ',
          name: 'Initech',
          code: 'ITX-3',
          address: '1600 Amphitheatre Parkway',
          contact: { name: 'Samir', email: 'samir@initech.com', phone: '555-0000', fax: '' },
        },
      ],
    })

    expect(wrapper.findAllComponents(OrderCard)).toHaveLength(3)
  })
})
