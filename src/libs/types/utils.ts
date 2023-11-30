export type HelpRoleMemberResult = {
  DbRole: 'db_datareader' | 'db_datawriter'
  MemberName: string
  MemberSID: Record<string, unknown>
}

export type MutateArticleProcResult = { ArtID: number }
