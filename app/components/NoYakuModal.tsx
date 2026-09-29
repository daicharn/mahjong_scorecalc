import { resType } from "../modules/TypeDefs";
import Modal from "./Modal";

type TypeNoYaku = {result: resType | undefined}

export default function NoYakuModal(props: TypeNoYaku){
    if(props.result && !props.result.yakuMapObj) return <Modal className={"modal_noyaku"} h2={"役なし"} p={"役が成立していません"} />
    else null;
}