import { BlockHais, BlockType, Hai, Meld, MeldType } from "mahjong_engine";
import { fuDetailObj } from "../modules/TypeDefs";
import { AnkanBlock, NakiBlock } from "./NakiView";

type TypeHonsuu = {han: number, yakuArray: [string, number][], allTiles: Hai[] };
type TypeFusuu = {fuCeiled: number, fuBasic: number, fuDetail: fuDetailObj[], allTiles: Hai[] };

function makeHaisFromMentsuType(minHaiId: number, mentsuType: BlockType | MeldType): Hai[]{
  switch(mentsuType){
    case BlockType.JANTO:
      return BlockHais.from(minHaiId, BlockType.JANTO).getHais();
    case BlockType.KOTSU:
    case MeldType.PON:
      return BlockHais.from(minHaiId, BlockType.KOTSU).getHais();
    case MeldType.MINKAN:
    case MeldType.ANKAN:
      return Meld.from(minHaiId, MeldType.ANKAN).getHais();
    default:
      return [];
  }
}

export function ResultTableHonsuu(props : TypeHonsuu){
  return (
    <table className="result_table result_table_honsuu">
      <thead>
        <tr><th colSpan={2}>{`${props.han}翻`}</th></tr>
      </thead>
      <tbody>
        {props.yakuArray.map(([name, han], index) => (
          <tr key={index}>
            <td>{`${han}翻`}</td>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function ResultTableFusuu(props: TypeFusuu){
  return (
    <table className="result_table result_table_fusuu">
      <thead>
        <tr><th colSpan={2}>{`${props.fuCeiled}符(${props.fuBasic})`}</th></tr>
      </thead>
      <tbody>
        {props.fuDetail.map((detail, index) => {
          const isAnkan = detail.mentsuType === MeldType.ANKAN;
          const hasHai = detail.minHaiId === undefined ? false : true;

          const block = hasHai
          ? isAnkan
            ? <AnkanBlock
                hais={makeHaisFromMentsuType(detail.minHaiId!, detail.mentsuType!)}
                allTiles={props.allTiles} 
              />
            : <NakiBlock
                hais={makeHaisFromMentsuType(detail.minHaiId!, detail.mentsuType!)}
                allTiles={props.allTiles} isRotate={false} 
              />
            : null;
          return(
            <tr key={index}>
              <td>{`${detail.fu}符`}</td>
              <td><p>{detail.name}</p>
                {block}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}