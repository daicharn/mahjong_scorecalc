import { Hai, Hais, Meld } from "mahjong_engine";
import { NakiMode } from '../modules/TypeDefs';
import { HandState } from "../modules/HandState";

export default function TehaiInputView({ hais, melds, allTiles, machiHais, nakiMode, onAddHai, addMelds }: 
  { hais: Hais, melds: Meld[], allTiles: Hai[], machiHais: Hai[], nakiMode: NakiMode, onAddHai: (id: number) => void, addMelds: (id:number) => void}){
  const rows = Array.from({length: 4}, (_, r) => 
    Array.from({length: 9}, (_, c) => r * 9 + c)
  );
  const handState = new HandState(hais, melds);
  const machiIds = new Set(machiHais.map(h => h.getId()));
  const isNakiMode = !nakiMode.none;

  return (
    <div className='tehai_input'>
      {rows.map((row, r) => (
        <div key={r} className='tehai_row'>
        {row
          .filter(i => !(r === 3 && i % 9 >= 7))
          .map(i => (
          <div key={i} className='tehai_cell'>
          {handState.canShowTile(i + 1, machiIds, nakiMode)
            ?(<img src={"images/" + allTiles[i].imageUrl} onClick={() => isNakiMode ? addMelds(i + 1) : onAddHai(i + 1)}></img>)
            :(<img src={"images/" + allTiles[34].imageUrl}></img>)
          }
          </div>
        ))}
        </div>
      ))}
    </div>
  );
}