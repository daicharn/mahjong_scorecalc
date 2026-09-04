import { Hai } from "mahjong_engine";
import { Meld } from "mahjong_engine";

export default function NakiView({ melds, allTiles, removeMelds }: { melds: Meld[], allTiles: Hai[], removeMelds: (index: number) => void }){
    return (
      <div className="naki_list">
        {melds.map((m, i) => (
          <div key={i} className="naki_block" onClick={() => removeMelds(i)}>
            <img src={"images/" + allTiles[m.minHai.getId() - 1].imageUrl}></img>
          </div>
        ))}
      </div>
    )
}