'use server'

import { ArticleRepository, FamilyRepository } from '@/libs/repositories'

export const getArticlesFiltered = async (
  id: string,
  name: string,
  description: string,
  price: string,
  familyId: string
) => {
  return ArticleRepository.getMany(id, name, description, price, familyId)
}

export const getFamilies = () => {
  return FamilyRepository.getMany()
}
