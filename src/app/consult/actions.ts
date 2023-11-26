'use server'

import { ArticleRepository } from '@/libs/repositories'

export const getArticlesFiltered = async (
  id: string,
  name: string,
  description: string,
  price: string
) => {
  return ArticleRepository.getMany(id, name, description, price)
}
