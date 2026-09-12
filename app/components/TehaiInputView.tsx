import { Hai, Hais, Meld } from "mahjong_engine";
import { Mode, NakiMode } from '../modules/TypeDefs';
import { HandState } from "../modules/HandState";

type TehaiInputProps = { 
  hais: Hais,
  melds: Meld[],
  allTiles: Hai[],
  machiHais: Hai[],
  nakiMode: NakiMode,
  mode: Mode,
  onAddHai: (id: number) => void,
  addMelds: (id: number) => void,
  showResultView: (agariHaiId: number) => void
};

function onTileClick(id: number, props: TehaiInputProps){
  switch(props.mode){
    case Mode.Normal:
      props.onAddHai(id + 1);
      break;
    case Mode.Naki:
      props.addMelds(id + 1);
      break;
    case Mode.Agari:
      props.showResultView(id + 1);
      break;
    default:
      break;
  }
}

export default function TehaiInputView(props: TehaiInputProps){
  const rows = Array.from({length: 4}, (_, r) => 
    Array.from({length: 9}, (_, c) => r * 9 + c)
  );
  const handState = new HandState(props.hais, props.melds);
  const machiIds = new Set(props.machiHais.map(h => h.getId()));

  return (
    <div className='tehai_input'>
      {rows.map((row, r) => (
        <div key={r} className='tehai_row'>
        {row
          .filter(i => !(r === 3 && i % 9 >= 7))
          .map(i => (
          <div key={i} className='tehai_cell'>
          {handState.canShowTile(i + 1, machiIds, props.hais, props.mode, props.nakiMode)
            ?(<img className='hai_image' src={"images/" + props.allTiles[i].imageUrl} onClick={() => onTileClick(i, props)}></img>)
            :(<img className='hai_image' src={"images/" + props.allTiles[34].imageUrl}></img>)
          }
          </div>
        ))}
        </div>
      ))}
    </div>
  );
}