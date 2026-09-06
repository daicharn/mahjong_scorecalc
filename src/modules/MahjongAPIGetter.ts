import { Meld } from "mahjong_engine";
import { resType } from "./TypeDefs";

export class MahjongAPIGetter{
    private url: string;
    private haiIds: number[];
    private melds: Meld[];
    constructor(url: string, haiIds: number[], melds: Meld[]){
        this.url = url;
        this.haiIds = haiIds;
        this.melds = melds;
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
          }))
        })
      });
    
      const data: resType = await res.json();
      return data;
    }
}