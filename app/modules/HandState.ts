import { Hai, Hais, Meld, MeldType, TILE } from "mahjong_engine";
import { Mode, NakiMode } from "./TypeDefs";

export class HandState{
    private hais: Hais;
    private melds: Meld[];
    private fourIds: Set<number>;
    constructor(hais: Hais, melds: Meld[]){
        this.hais = hais;
        this.melds = melds;
        this.fourIds = this.getFourIds();
    }

    private getFourIds(): Set<number>{
        return new Set(this.getUsedLimitHais(0).map(h => h.getId()));
    }

    private getNumNaki(haiId: number): number{
      let nakiCount = 0;
      this.melds.forEach(meld => {
        const minId = meld.minHai.getId();
        switch(meld.getType()){
          case MeldType.CHI:
            if(haiId >= minId && haiId <= minId + 2) nakiCount++;
            break;
          case MeldType.PON:
            if(haiId === minId) nakiCount += 3;
            break;
          case MeldType.MINKAN:
          case MeldType.ANKAN:
            if(haiId === minId) nakiCount += 4;
            break;
        }
      });
      
      return nakiCount;
    }
    
    private getUsedMeldHais(meld: Meld): Hai[]{
      const minId = meld.minHai.getId();
    
      switch(meld.getType()){
        case MeldType.CHI:
          return [new Hai(minId), new Hai(minId + 1), new Hai(minId + 2)];
        case MeldType.PON:
        case MeldType.MINKAN:
        case MeldType.ANKAN:
          return [new Hai(minId)];
        default:
          return [];
      }
    }
    
    public getUsedLimitHais(value: number): Hai[]{
      const usedHais = this.hais.getHais().filter(h => {
        const haiId = h.getId();
        
        const countInHand = this.hais.count(haiId);
        return countInHand >= 4 - value;
      });
      
      const usedMelds = this.melds
        .flatMap(m => this.getUsedMeldHais(m))
        .filter(h => {
          const haiId = h.getId();
          const countInHand = this.hais.count(haiId);
          const countInNaki = this.getNumNaki(haiId);
          return countInNaki + countInHand >= 4 - value
        });
    
      return [...usedHais, ...usedMelds];
    }
    
    private isNotChiLimit(haiId: number): boolean{
      const chiRange = Array.from({length: 3} , (_, i) => haiId + i);
      const isNotFour = chiRange.every(n => !this.fourIds.has(n));
      const isShuntsuHai = ((haiId - 1) % 9 < 7) && haiId < TILE.JIHAI[0]
    
      return isNotFour && isShuntsuHai;
    }
    
    private isNotPonLimit(haiId: number): boolean{
      const limitHais = this.getUsedLimitHais(2).map(h => h.getId());
      return !limitHais.includes(haiId);
    }
    
    private isNotKanLimit(haiId: number): boolean{
      const limitHais = this.getUsedLimitHais(3).map(h => h.getId());
      return !limitHais.includes(haiId);
    }
    
    private isNotNakiLimit(haiId: number, nakiMode: NakiMode): boolean{
      if(nakiMode.chi) return this.isNotChiLimit(haiId);
      else if(nakiMode.pon) return this.isNotPonLimit(haiId);
      else if(nakiMode.minkan || nakiMode.ankan) return this.isNotKanLimit(haiId);
      return true;
    }
    
    public canShowTile(haiId: number, machiIds: Set<number>, hais: Hais, mode: Mode, nakiMode: NakiMode): boolean {
      const isMachi = machiIds.size === 0 || machiIds.has(haiId);
      const isNotFour = !this.fourIds.has(haiId);
    
      if(mode === Mode.Normal) return isMachi && isNotFour;
      if(mode === Mode.Naki) return this.isNotNakiLimit(haiId, nakiMode);
      if(mode === Mode.Agari) return hais.ids.includes(haiId);

      return false;
    }
}