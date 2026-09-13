import { Hai, PlayerContext, TILE, Wind } from "mahjong_engine";
import { AgariVal, RiichiVal, Settings, WindVal } from "./TypeDefs";

export class MapSettingsToContext{
    private agariHai: Hai;
    private settings: Settings;
    constructor(agariHai: Hai, settings: Settings){
        this.agariHai = agariHai;
        this.settings = settings;
    }

    private isTsumo(): boolean{
        if(this.settings.agari === AgariVal.Tsumo) return true;
        return false;
    }

    private isRiichi(): boolean{
        if(this.settings.riichi === RiichiVal.Riichi) return true;
        return false;
    }

    private isDaburii(): boolean{
        if(this.settings.riichi === RiichiVal.Daburii) return true;
        return false;
    }

    private getWind(windStr: string): Wind{
        switch(windStr){
            case WindVal.EAST:
                return TILE.WIND.EAST;
            case WindVal.SOUTH:
                return TILE.WIND.SOUTH;
            case WindVal.WEST:
                return TILE.WIND.WEST;
            case WindVal.NORTH:
                return TILE.WIND.NORTH;
            default:
                return TILE.WIND.EAST;
        }
    }

    public toContext(){
        return new PlayerContext({
            agariHai: this.agariHai,
            isTsumo: this.isTsumo(),
            playerWind: this.getWind(this.settings.playerwind),
            roundWind: this.getWind(this.settings.roundwind),
            riichi: this.isRiichi(),
            daburii: this.isDaburii()
        });
    }
}