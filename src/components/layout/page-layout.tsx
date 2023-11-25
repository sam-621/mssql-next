import { FC, PropsWithChildren } from 'react'
import { cn } from '../utils'

export const PageLayout: FC<Props> = ({ children, className }) => {
  return <div className={cn('flex items-center h-screen w-1/4 mx-auto', className)}>{children}</div>
}

type Props = PropsWithChildren & {
  className?: string
}
