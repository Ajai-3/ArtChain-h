// domain/entities/artwork.entity.ts
export class Artwork {
  constructor(
    public _id: string,
    public userId: string,
    public title: string,
    public description: string = '',
    public tags: string[] = [],
    public images: string[] = [],
    public nsfw: boolean = false,
    public isCollectible: boolean = false,
    public artType: string = 'digital',
    public price: number = 0,
    public soldCopies: number = 0,
    public downloadAccess: boolean = false,
    public isCommentEnabled: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  // Business methods
  public markAsNSFW(): void {
    this.nsfw = true;
    this.updatedAt = new Date();
  }

  public incrementSoldCopies(): void {
    this.soldCopies++;
    this.updatedAt = new Date();
  }
}