import { Hais, ShantenCalculator } from "mahjong_engine";
import { Mode } from "../modules/TypeDefs";
import Modal from "./Modal";

type TypeNoten = {hais: Hais, mode: Mode}

export default function NotenModal(props: TypeNoten){
    if(props.mode === Mode.Noten){
        const shanten = new ShantenCalculator(props.hais.getHais()).calculate();
        return <Modal className={"modal_noten"} h2={`${shanten}向聴`} p={"手牌をクリックして一枚削除してください"} />
    }
    else{
        return null;
    }
}