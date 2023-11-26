import { FC } from 'react'

export const RadioButton: FC<Props> = ({ label, ...rest }) => {
  return (
    <div className='flex items-center '>
      <input
        id={rest.id ?? rest.name}
        type='radio'
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        {...rest}
      />
      <label
        htmlFor={rest.id ?? rest.name}
        className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
      >
        {label}
      </label>
    </div>
  )
}

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
}
