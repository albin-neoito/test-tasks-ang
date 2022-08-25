export interface user {
    age: number,
    avatarUrl: string,
    bio: string,
    color: string,
    createdAt: Date,
    email: string,
    id: number,
    isPublic: boolean,
    name: string,
    statusMessage: string
 }

 export interface logUser {
   email: string,
   password: string
 }