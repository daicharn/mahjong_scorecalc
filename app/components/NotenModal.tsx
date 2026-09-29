import { Mode } from "../modules/TypeDefs";
import Modal from "./Modal";

type TypeNoten = {shanten: number, mode: Mode}

export default function NotenModal(props: TypeNoten){
    if(props.mode === Mode.Noten) return <Modal className={"modal_noten"} h2={`${props.shanten}向聴`} p={"手牌をクリックして一枚削除してください"} />
    else null;
}