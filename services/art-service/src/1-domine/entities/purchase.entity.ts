export class Purchase {
  constructor(
    public _id: string,
    public buyerId: string,
    public artistId: string,
    public artworkId: string,
    public txnId: string,
    public accessGranted: boolean = false,
    public downloaded: boolean = false,
    public createdAt: Date = new Date()
  ) {}
}
