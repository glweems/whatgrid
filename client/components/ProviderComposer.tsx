import React from 'react'

interface Props {
  contexts: any[]
}

const ProviderComposer: React.FC<Props> = ({ contexts, children }) =>
  contexts.reduceRight(
    (kids: any, parent: any) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  )

export default ProviderComposer
