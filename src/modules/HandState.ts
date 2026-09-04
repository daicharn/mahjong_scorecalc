import { Hai, Hais, Meld, MeldType, TILE } from "mahjong_engine";
import { NakiMode } from "./TypeDefs";

export class HandState{
    public hais: Hais;
    public melds: Meld[];
    constructor(hais: Hais, melds: Meld[]){
        this.hais = hais;
        this.melds = melds;
    }

    private getNumNaki(haiId: number, melds: Meld[]): number{
      let nakiCount = 0;
      melds.forEach(meld => {
        const minId = meld.minHai.getId();
        switch(meld.getType()){
          case MeldType.CHI:
            if([minId, minId + 1, minId + 2].includes(haiId)) nakiCount++;
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
          const countInNaki = this.getNumNaki(haiId, this.melds);
          return countInNaki + countInHand >= 4 - value
        });
    
      console.log(usedMelds);
      return [...usedHais, ...usedMelds];
    }
    
    private isNotChiLimit(haiId: number, fourIds: Set<number>): boolean{
      const fiveArray = Array.from({length: 3} , (_, i) => haiId + i);
      const isNotFour = fiveArray.every(n => !fourIds.has(n));
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
    
    private isNotNakiLimit(haiId: number, fourIds: Set<number>, nakiMode: NakiMode): boolean{
      if(nakiMode.chi) return this.isNotChiLimit(haiId, fourIds);
      else if(nakiMode.pon) return this.isNotPonLimit(haiId);
      else if(nakiMode.minkan || nakiMode.ankan) return this.isNotKanLimit(haiId);
      return true;
    }
    
    public canShowTile(haiId: number, fourIds: Set<number>, machiIds: Set<number>, nakiMode: NakiMode): boolean {
      const isMachi = machiIds.size === 0 || machiIds.has(haiId);
      const isNotFour = !fourIds.has(haiId);
    
      return isMachi && isNotFour && this.isNotNakiLimit(haiId, fourIds, nakiMode);
    }
}