import { FC } from 'react'
import { cn } from '../utils'

export const Input: FC<Props> = ({ className, label, errorMessage, ...rest }) => {
  return (
    <div className={cn(className)}>
      <label
        htmlFor={rest.id ?? rest.name}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <input
        {...rest}
        className={cn(
          'block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
          {
            'focus:ring-2 focus:ring-offset-2': !errorMessage,
            'focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:border-red-500': errorMessage,
          }
        )}
      />
      {errorMessage && (
        <div>
          <span className='text-red-500'>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  errorMessage?: string
  className?: string
}
