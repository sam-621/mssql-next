import { FC, PropsWithChildren } from 'react'
import { cn } from '../utils'

export const PageLayout: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center h-screen w-1/3 max-w-lg mx-auto', className)}>
      {children}
    </div>
  )
}

type Props = PropsWithChildren & {
  className?: string
}
