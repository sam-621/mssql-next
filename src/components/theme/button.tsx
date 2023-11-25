import { FC, PropsWithChildren } from 'react'
import { cn } from '../utils'

export const Button: FC<Props> = ({ children, className, variant = 'primary', ...rest }) => {
  return (
    <button
      {...rest}
      className={cn(
        {
          'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800':
            variant === 'primary',
          'text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2':
            variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </button>
  )
}

type Props = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary'
  }
