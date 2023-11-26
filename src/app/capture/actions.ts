'use server'

import { ArticleRepository } from '@/libs/repositories'
import { Article } from '@/libs/types'

export const getArticleById = async (id: string) => {
  return ArticleRepository.getById(id)
}

export const createArticle = async (article: Omit<Article, 'famName'>) => {
  return ArticleRepository.create(article)
}

export const updateArticle = async (article: Omit<Article, 'famName'>) => {
  return ArticleRepository.update(article)
}
