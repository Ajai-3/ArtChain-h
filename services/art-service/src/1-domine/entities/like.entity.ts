export class Like {
  constructor(
    public _id: string,
    public userId: string,
    public artworkId: string,
    public createdAt: Date = new Date()
  ) {}
}