import { Hai } from "mahjong_engine";
import { Meld } from "mahjong_engine";
import { MeldType } from 'mahjong_engine';

function makeNakiBlock(meld: Meld, allTiles: Hai[]){
  return (
    <>
    {meld.getHais().map((h, i) => (
      (i === 0) 
      ? <img key={i} className='hai_image rotate90' src={"images/" + allTiles[h.getId() - 1].imageUrl}></img>
      : <img key={i} className='hai_image' src={"images/" + allTiles[h.getId() - 1].imageUrl}></img>
    ))}
    </>
  )
}

function makeAnkanBlock(meld: Meld, allTiles: Hai[]){
  return (
    <>
    {meld.getHais().map((h, i) => (
      (i === 0 || i === 3)
      ? <img key={i} className='hai_image' src={"images/" + allTiles[34].imageUrl}></img>
      : <img key={i} className='hai_image' src={"images/" + allTiles[h.getId() - 1].imageUrl}></img>
    ))}
    </>
  )
}


export default function NakiView({ melds, allTiles, removeMelds }: { melds: Meld[], allTiles: Hai[], removeMelds: (index: number) => void }){
    return (
      <div className="naki_list">
        {melds.map((m, i) => (
          <div key={i} className="naki_block" onClick={() => removeMelds(i)}>
            {m.getType() === MeldType.ANKAN ? makeAnkanBlock(m, allTiles) : makeNakiBlock(m, allTiles)}
          </div>
        ))}
      </div>
    )
}