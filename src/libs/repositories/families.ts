import { Family } from '../types'
import { sqlQuery } from './sql-server'

const getMany = async () => {
  const result = await sqlQuery<Family>(`SELECT id=F.famid, name=F.famnombre FROM Familias F`)

  if (!result.success) {
    console.log(result.error)
    return []
  }

  return result.data
}

export const FamilyRepository = {
  getMany,
}
