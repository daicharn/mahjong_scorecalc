import { MeldType } from "mahjong_engine";
import { NakiMode } from "./TypeDefs";

export class MeldUtils{
    static getMeldType(nakiMode: NakiMode): MeldType{
      if(nakiMode.chi) return MeldType.CHI;
      if(nakiMode.pon) return MeldType.PON;
      if(nakiMode.minkan) return MeldType.MINKAN;
      if(nakiMode.ankan) return MeldType.ANKAN;
      return MeldType.PON;
    }
}