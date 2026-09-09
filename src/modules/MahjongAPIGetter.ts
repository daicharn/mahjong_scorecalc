import { Meld, PlayerContext } from "mahjong_engine";
import { resType } from "./TypeDefs";

export class MahjongAPIGetter{
    private url: string;
    private haiIds: number[];
    private melds: Meld[];
    private ctx: PlayerContext;
    constructor(url: string, haiIds: number[], melds: Meld[], ctx: PlayerContext){
        this.url = url;
        this.haiIds = haiIds;
        this.melds = melds;
        this.ctx = ctx;
    }

    async get(){
      const res = await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          haiIds: this.haiIds,
          melds: this.melds.map(m => ({
            type: m.getType(),
            hais: m.getHais().map(h => h.getId())
          })),
          agariHaiId: this.ctx.agariHai.getId(),
          isTsumo: this.ctx.isTsumo,
          playerWind: this.ctx.playerWind,
          roundWind: this.ctx.roundWind
        })
      });
    
      const data: resType = await res.json();
      return data;
    }
}