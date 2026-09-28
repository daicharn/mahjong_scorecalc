import { Hai, MachiType } from "mahjong_engine";

export class MachiUtils{
    static calcMachiIndex(hais: Hai[], machiType: MachiType | undefined, haiId: number){
        let index: number = -1;
        switch(machiType){
            case MachiType.KANCHAN:
                index = 1;
                break;
            case MachiType.PENCHAN:
                const haiNum = new Hai(haiId).num;
                index = (haiNum === 1 || haiNum === 3) ? hais.length - 1 : 0;
                break;
            case MachiType.TANKI:
            case MachiType.SHANPON:  
                index = 0;
                break;
            case MachiType.RYANMEN:
                index = hais.map(h => h.getId()).findIndex(n => n === haiId);
                break;
        }
        return index;
    }
}