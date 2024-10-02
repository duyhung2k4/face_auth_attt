import { BaseModel } from "./base";

export type EventModel = BaseModel & {
    startTime: Date
    finishTime: Date
    sizeX: number
    sizeY: number
}