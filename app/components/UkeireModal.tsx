import { Hais, ShantenCalculator } from "mahjong_engine";
import { Mode } from "../modules/TypeDefs";
import Modal from "./Modal";

type TypeUkeire = {hais: Hais, mode: Mode};

function getShantenText(shanten: number){
    switch(shanten){
        case -1:
            return "アガリ";
        case 0:
            return "テンパイ";
        default:
            return `${shanten}向聴`;
    }
}

export default function NotenModal(props: TypeUkeire){
    if(props.mode === Mode.Ukeire){
        const shanten = new ShantenCalculator(props.hais.getHais()).calculate();
        return <Modal className={"modal_ukeire"} h2={getShantenText(shanten)} p={"以下をクリックして有効牌を計算"} />
    }
    else{
        return null;
    }
}