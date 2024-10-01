import { ApiHoldingsResponse, ApiPaymentData, IAddress } from '@type/api'

const holding_temp = [
  [
    {
      title: 'WORLD PHONE',
      count: 0,
      icon: '/images/product/phone21.png',
      key: 'phone'
    },
    {
      title: 'WPN TOKEN',
      count: 0,
      icon: '/images/account/wpn-token.png',
      key: 'wpnTokenAmount'
    },
    {
      title: 'REWARDS',
      count: 0,
      icon: '/images/account/rewards-icon.png',
      key: 'availableRewards'
    }
  ],
  [
    {
      title: 'MATRIX',
      count: 0,
      icon: '/images/checkout/matrix.png',
      key: 'matrix'
    },
    {
      title: 'AI AGENT ONE',
      count: 0,
      icon: '/images/product/ai_agent_one.png',
      key: 'agent_one'
    },
    {
      title: 'AI AGENT PRO',
      count: 0,
      icon: '/images/product/ai_agent_pro.png',
      key: 'agent_pro'
    },
    {
      title: 'AI AGENT ULTRA',
      count: 4,
      icon: '/images/product/ai_agent_ultra.png',
      key: 'agent_ultra'
    }
  ]
]

export const processHoldings = (holdings: ApiHoldingsResponse = {}) => {
  return holding_temp.map((group) =>
    group.map((item) => {
      const matchedValue =
        Object.entries(holdings).find(([key]) => key === item.key)?.[1] || 0

      return {
        ...item,
        count:
          item.key === 'wpnTokenAmount' || item.key === 'availableRewards'
            ? Number(matchedValue) / 1000000
            : matchedValue
      }
    })
  )
}

export const formatAddress = (address?: IAddress) => {
  if (!address) return ''

  return `${address.address}, ${address.city}, ${address.country}, ${address.province}`
}

export const statusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'border-[#34D399] bg-[rgba(4,120,87,0.20)]'
    case 'paid':
      return 'border-[#FACC15] bg-[rgba(161,98,7,0.20)]'
    case 'shipped':
      return 'border-[#fff] bg-[#151515]'
    case 'unpaid':
      return 'border-[#00AEEF] bg-[rgba(0,174,239,0.20)]'
    default:
      return ''
  }
}

export const statusType = (order: ApiPaymentData) => {
  if (order.type === 'phone' && order.status === 'paid') {
    return 'confirm'
  } else if (order.type === 'phone' && order.status === 'shipped') {
    return 'shipped'
  } else {
    return 'other'
  }
}
