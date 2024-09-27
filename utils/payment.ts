export enum ProductEnum {
  AGENT_ULTRA = 'agent_ultra',
  AGENT_PRO = 'agent_pro',
  AGENT_ONE = 'agent_one',
  PHONE = 'phone'
}

export const convertTypeToName = (type: string) => {
  switch (type) {
    case ProductEnum.AGENT_ONE:
      return 'Ai Agent One'
    case ProductEnum.AGENT_PRO:
      return 'Ai Agent Pro'
    case ProductEnum.AGENT_ULTRA:
      return 'Ai Agent Ultra'
    case ProductEnum.PHONE:
      return 'Matrix Layer Protocol'
    default:
      return ''
  }
}

export const convertTypeToInt = (type: string) => {
  switch (type) {
    case ProductEnum.AGENT_ONE:
      return 1
    case ProductEnum.AGENT_PRO:
      return 2
    case ProductEnum.AGENT_ULTRA:
      return 3
    case ProductEnum.PHONE:
      return 0
    default:
      return -1
  }
}
