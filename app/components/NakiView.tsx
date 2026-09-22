import { Hai } from "mahjong_engine";
import { Meld } from "mahjong_engine";
import { MeldType } from 'mahjong_engine';

type TypeNakiBlock = {hais: Hai[], allTiles: Hai[], isRotate: boolean};
type TypeAnkanBlock = {hais: Hai[], allTiles: Hai[]};

export function NakiBlock(props: TypeNakiBlock){
  return (
    <>
    {props.hais.map((h, i) => (
      (i === 0) 
      ? <img key={i} className={`hai_image ${props.isRotate && 'rotate90'}`} src={"images/" + props.allTiles[h.getId() - 1].imageUrl}></img>
      : <img key={i} className='hai_image' src={"images/" + props.allTiles[h.getId() - 1].imageUrl}></img>
    ))}
    </>
  )
}

export function AnkanBlock(props: TypeAnkanBlock){
  return (
    <>
    {props.hais.map((h, i) => (
      (i === 0 || i === 3)
      ? <img key={i} className='hai_image' src={"images/" + props.allTiles[34].imageUrl}></img>
      : <img key={i} className='hai_image' src={"images/" + props.allTiles[h.getId() - 1].imageUrl}></img>
    ))}
    </>
  )
}

export function NakiViewResult({ melds, allTiles } : { melds: Meld[], allTiles: Hai[]}){
  return (
    <div className="naki_list_result">
      {melds.map((m, i) => (
          <div key={i} className="naki_block">
            {m.getType() === MeldType.ANKAN
            ? <AnkanBlock hais={m.getHais()} allTiles={allTiles} /> 
            : <NakiBlock hais={m.getHais()} allTiles={allTiles} isRotate={true} />
            }
          </div>
      ))}
    </div>
  )
}

export default function NakiView({ melds, allTiles, removeMelds }: { melds: Meld[], allTiles: Hai[], removeMelds: (index: number) => void }){
    return (
      <div className="naki_list">
        {melds.map((m, i) => (
          <div key={i} className="naki_block" onClick={() => removeMelds(i)}>
            {m.getType() === MeldType.ANKAN
            ? <AnkanBlock hais={m.getHais()} allTiles={allTiles} /> 
            : <NakiBlock hais={m.getHais()} allTiles={allTiles} isRotate={true} />
            }
          </div>
        ))}
      </div>
    )
}