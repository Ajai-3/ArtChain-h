export class User {
  constructor(

    public name: string,
    public username: string,
    public email: string,
    public phone: number,
    public password: string,
    public isVerified: boolean,
    public profileImage: string,
    public bannerImage: string,
    public backroundImage: string,
    public bio: string,
    public country: string,
    public role: "user" | "artist" | "admin",
    public plan: "free" | "pro" | "pro_plus",
    public status: "banned" | "suspended" | "active" | "deleted",
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
