import { FC, PropsWithChildren } from 'react'
import { cn } from '../utils'

export const Card: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  )
}

type Props = PropsWithChildren & {
  className?: string
}
