import { resType } from "./TypeDefs";

export class MahjongAPIGetter{
    private url: string;
    private haiIds: number[];
    constructor(url: string, haiIds: number[]){
        this.url = url;
        this.haiIds = haiIds;
    }

    async get(){
      const res = await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          haiIds: this.haiIds
        })
      });
    
      const data: resType = await res.json();
      return data;
    }
}