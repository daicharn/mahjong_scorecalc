import { Hais } from "mahjong_engine"
import { NakiMode } from "./TypeDefs"

export interface TileContext {
    haiId: number,
    hais: Hais,
    fourIds: Set<number>,
    machiIds: Set<number>
    nakiMode: NakiMode,
}