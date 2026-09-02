import {Hai} from 'mahjong_engine';
import {Hais} from 'mahjong_engine';

import {NakiMode} from '../TypeDefs';

function getUsedFourHais(hais: Hais): Hai[] {
  return hais.getHais().filter(h => hais.count(h.getId()) === 4);
}

/*
function isNakiLimit(nakiMode: NakiMode){
  if(nakiMode.pon) return 1;
  else if(nakiMode.minkan || nakiMode.ankan) return 0;
  else return 3;
}
  */

function canShowTile(haiId: number, fourHais: Hai[], machiHais: Hai[], nakiMode: NakiMode): boolean {
  const machiIds = new Set(machiHais.map(h => h.getId()));
  const fourIds = new Set(fourHais.map(h => h.getId()));

  const isMachi = machiHais.length === 0 || machiIds.has(haiId);
  const isNotFour = !fourIds.has(haiId);

  return isMachi && isNotFour;
}

export default function TehaiInputView({ hais, allTiles, machiHais, nakiMode, onAddHai }: { hais: Hais, allTiles: Hai[], machiHais: Hai[], nakiMode: NakiMode, onAddHai: (id: number) => void }){
  const rows = Array.from({length: 4}, (_, r) => 
    Array.from({length: 9}, (_, c) => r * 9 + c)
  );
  const foudHais = getUsedFourHais(hais);
  return (
    <div className='tehai_input'>
      {rows.map((row, r) => (
        <div key={r} className='tehai_row'>
        {row
          .filter(i => !(r === 3 && i % 9 >= 7))
          .map(i => (
          <div key={i} className='tehai_cell'>
          {canShowTile(i + 1, foudHais, machiHais, nakiMode)
            ?(<img src={"images/" + allTiles[i].imageUrl} onClick={() => onAddHai(i + 1)}></img>)
            :(<img src={"images/" + allTiles[34].imageUrl}></img>)
          }
          </div>
        ))}
        </div>
      ))}
    </div>
  );
}