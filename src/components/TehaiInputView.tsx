import {Hai} from 'mahjong_engine';

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
          {((machiHais.length === 0 || machiHais.map(h => h.getId()).includes(i + 1)) &&
            !fourHais.map(h => h.getId()).includes(i + 1))
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