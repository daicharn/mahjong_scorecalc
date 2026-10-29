import { Hai } from "mahjong_engine";
import { Meld } from "mahjong_engine";
import { MeldType } from 'mahjong_engine';
import style from './NakiView.module.css';

type TypeNakiBlock = {hais: Hai[], allTiles: Hai[], isResult: boolean, isRotate: boolean};
type TypeAnkanBlock = {hais: Hai[], allTiles: Hai[], isResult: boolean};

export function NakiBlock(props: TypeNakiBlock){
  const name = props.isResult ? style.hai_image_result : style.hai_image;
  return (
    <>
    {props.hais.map((h, i) => (
      (i === 0) 
      ? <img key={i} className={`${name} ${props.isRotate && style.rotate90 }`} src={"images/" + props.allTiles[h.getId() - 1].imageUrl}></img>
      : <img key={i} className={name} src={"images/" + props.allTiles[h.getId() - 1].imageUrl}></img>
    ))}
    </>
  )
}

export function AnkanBlock(props: TypeAnkanBlock){
  const name = props.isResult ? style.hai_image_result : style.hai_image;
  return (
    <>
    {props.hais.map((h, i) => (
      (i === 0 || i === 3)
      ? <img key={i} className={name} src={"images/" + props.allTiles[34].imageUrl}></img>
      : <img key={i} className={name} src={"images/" + props.allTiles[h.getId() - 1].imageUrl}></img>
    ))}
    </>
  )
}

export function NakiViewResult({ melds, allTiles } : { melds: Meld[], allTiles: Hai[]}){
  return (
    <div className={style.naki_list_result}>
      {melds.map((m, i) => (
          <div key={i} className={style.naki_block}>
            {m.getType() === MeldType.ANKAN
            ? <AnkanBlock hais={m.getHais()} allTiles={allTiles} isResult={true} /> 
            : <NakiBlock hais={m.getHais()} allTiles={allTiles} isResult={true} isRotate={true} />
            }
          </div>
      ))}
    </div>
  )
}

export default function NakiView({ melds, allTiles, removeMelds }: { melds: Meld[], allTiles: Hai[], removeMelds: (index: number) => void }){
    return (
      <div className={style.naki_list}>
        {melds.map((m, i) => (
          <div key={i} className={style.naki_block} onClick={() => removeMelds(i)}>
            {m.getType() === MeldType.ANKAN
            ? <AnkanBlock hais={m.getHais()} allTiles={allTiles} isResult={false} /> 
            : <NakiBlock hais={m.getHais()} allTiles={allTiles} isResult={false} isRotate={true} />
            }
          </div>
        ))}
      </div>
    )
}