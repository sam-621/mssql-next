import { FC } from 'react'

export const ErrorMessage: FC<Props> = ({ message }) => {
  return (
    <div>
      <span className='text-red-500'>{message}</span>
    </div>
  )
}

type Props = {
  message: string
}
