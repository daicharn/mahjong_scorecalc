import {Hai} from 'mahjong_engine';

function canShowTile(haiId: number, machiHais: Hai[], fourHais: Hai[]): boolean {
  const machiIds = new Set(machiHais.map(h => h.getId()));
  const fourIds = new Set(fourHais.map(h => h.getId()));

  const isMachi = machiHais.length === 0 || machiIds.has(haiId);
  const isNotFour = !fourIds.has(haiId);

  return isMachi && isNotFour;
}

export default function TehaiInputView({ allTiles, machiHais, fourHais, onAddHai }: { allTiles: Hai[], machiHais: Hai[], fourHais: Hai[], onAddHai: (id: number) => void }){
  const rows = Array.from({length: 4}, (_, r) => 
    Array.from({length: 9}, (_, c) => r * 9 + c)
  );
  return (
    <div className='tehai_input'>
      {rows.map((row, r) => (
        <div key={r} className='tehai_row'>
        {row
          .filter(i => !(r === 3 && i % 9 >= 7))
          .map(i => (
          <div key={i} className='tehai_cell'>
          {canShowTile(i + 1, machiHais, fourHais)
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