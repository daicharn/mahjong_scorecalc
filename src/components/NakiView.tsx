import { Hai } from "mahjong_engine";
import { Meld } from "mahjong_engine";

export default function NakiView({ melds, allTiles }: { melds: Meld[], allTiles: Hai[]}){
    return (
      <div className="naki_list">
        {melds.map((m, i) => (
          <div key={i} className="naki_block">
            <img src={"images/" + allTiles[m.minHai.getId() - 1].imageUrl}></img>
          </div>
        ))}
      </div>
    )
}