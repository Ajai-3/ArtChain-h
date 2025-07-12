export class Commission {
  constructor(
    public _id: string,
    public requesterId: string,
    public artistId: string,
    public title: string,
    public description: string,
    public referenceImages: string[] = [],
    public budget: number,
    public deadline: Date,
    public status: 'requested' | 'accepted' | 'rejected' | 'completed' = 'requested',
    public artworkUrl?: string,
    public paymentTxnId?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}