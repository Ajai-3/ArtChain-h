export class User {
  constructor(

    public name: string,
    public username: string,
    public email: string,
    public phone: string,
    public password: string,
    public isVerified: boolean,
    public profileImage: string | null,
    public bannerImage: string | null,
    public backgroundImage: string | null,
    public bio: string | null,
    public country: string | null,
    public role: "user" | "artist" | "admin",
    public plan: "free" | "pro" | "pro_plus",
    public status: "banned" | "suspended" | "active" | "deleted",
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
