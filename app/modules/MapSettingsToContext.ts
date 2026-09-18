import { Hai, PlayerContext, TILE, Wind, WinEvent } from "mahjong_engine";
import { AgariVal, BoolVal, OtherVal, RiichiVal, Settings, WindVal } from "./TypeDefs";

export class MapSettingsToContext{
    private agariHai: Hai;
    private settings: Settings;
    constructor(agariHai: Hai, settings: Settings){
        this.agariHai = agariHai;
        this.settings = settings;
    }

    private isTsumo(): boolean{
        return this.settings.agari === AgariVal.Tsumo;
    }

    private isRiichi(): boolean{
        return this.settings.riichi === RiichiVal.Riichi;
    }

    private isDaburii(): boolean{
        return this.settings.riichi === RiichiVal.Daburii;
    }

    private isIppatsu(): boolean{
        return this.settings.ippatsu === BoolVal.True;
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

    private getWinEvent(){
        const map: Record<string, WinEvent> = {
            [OtherVal.Tenho]: WinEvent.TENHO,
            [OtherVal.Chiho]: WinEvent.CHIHO,
            [OtherVal.Rinshan]: WinEvent.RINSHAN,
            [OtherVal.chankan]: WinEvent.CHANKAN,
            [OtherVal.haitei]: WinEvent.HAITEI,
            [OtherVal.houtei]: WinEvent.HOUTEI,
            [OtherVal.None]: WinEvent.NONE,
        };

        return map[this.settings.other] ?? WinEvent.NONE;
    }

    public toContext(){
        return new PlayerContext({
            agariHai: this.agariHai,
            isTsumo: this.isTsumo(),
            playerWind: this.getWind(this.settings.playerwind),
            roundWind: this.getWind(this.settings.roundwind),
            riichi: this.isRiichi(),
            daburii: this.isDaburii(),
            ippatsu: this.isIppatsu(),
            event: this.getWinEvent()
        });
    }
}