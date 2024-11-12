import { deepmergeCustom, DeepMergeLeafURI } from 'deepmerge-ts'

export { deepmerge } from 'deepmerge-ts'

// Do not concatenate arrays.
export const deepMergeArrays = deepmergeCustom<
  unknown,
  {
    DeepMergeArraysURI: DeepMergeLeafURI
  }
>({
  mergeArrays: false
})
