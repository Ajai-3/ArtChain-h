export class Comment {
  constructor(
    public _id: string,
    public userId: string,
    public artworkId: string,
    public text: string,
    public status: 'active' | 'reported' | 'deleted' = 'active',
    public createdAt: Date = new Date()
  ) {}
}
