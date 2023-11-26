'use server'

import { ArticleRepository } from '@/libs/repositories'

export const getArticleById = async (id: string) => {
  return ArticleRepository.getById(id)
}
