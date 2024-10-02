import { BaseModel } from "./base";

export type ProfileModel = BaseModel & {
    email: string
    firstName: string
    lastName: string
    nickname: string
    active: boolean

    publicKey: string
    privateKey: string
}