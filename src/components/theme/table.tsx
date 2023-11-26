import { Article } from '@/libs/types'
import { FC } from 'react'

export const Table: FC<Props> = ({ articles }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Clave
            </th>
            <th scope='col' className='px-6 py-3'>
              Nombre
            </th>
            <th scope='col' className='px-6 py-3'>
              Descripción
            </th>
            <th scope='col' className='px-6 py-3'>
              Precio
            </th>
            <th scope='col' className='px-6 py-3'>
              Familia
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr
              key={article.id}
              className='h-14 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {article.id}
              </th>
              <td className='px-6 py-4'>{article.name}</td>
              <td className='px-6 py-4'>{article.description}</td>
              <td className='px-6 py-4'>{article.price}</td>
              <td className='px-6 py-4'>{article.famName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type Props = {
  articles: Article[]
}
