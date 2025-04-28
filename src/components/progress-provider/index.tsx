'use client'

import { ProgressProvider } from '@bprogress/next/app'

const ProgressProviderComponent = ({
  children,
}: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height='4px'
      color='#E51E3E'
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  )
}

export default ProgressProviderComponent
