import {Hai} from 'mahjong_engine';
import {Hais} from 'mahjong_engine';
import {TILE} from 'mahjong_engine';

import {NakiMode} from '../TypeDefs';
import {TileContext} from '../TileContext';

function getUsedLimitHais(hais: Hais, value: number){
  return hais.getHais().filter(h => hais.count(h.getId()) >= 4 - value);
}

function isNotChiLimit(ctx: TileContext): boolean{
  const {haiId, fourIds} = ctx;
  const fiveArray = Array.from({length: 5} , (_, i) => haiId - 2 + i);
  const isNotFour = fiveArray.every(n => !fourIds.has(n));
  const isShuntsuHai = ((haiId - 1) % 9 < 7) && haiId < TILE.JIHAI[0]

  return isNotFour && isShuntsuHai;
}

function isNotPonLimit(ctx: TileContext): boolean{
  const limitHais = getUsedLimitHais(ctx.hais, 2).map(h => h.getId());
  return !limitHais.includes(ctx.haiId);
}

function isNotKanLimit(ctx: TileContext): boolean{
  const limitHais = getUsedLimitHais(ctx.hais, 3).map(h => h.getId());
  return !limitHais.includes(ctx.haiId);
}

function isNotNakiLimit(ctx: TileContext): boolean{
  if(ctx.nakiMode.chi) return isNotChiLimit(ctx);
  else if(ctx.nakiMode.pon) return isNotPonLimit(ctx);
  else if(ctx.nakiMode.minkan || ctx.nakiMode.ankan) return isNotKanLimit(ctx);
  return true;
}

function canShowTile(ctx: TileContext): boolean {
  const {haiId, fourIds, machiIds} = ctx;

  const isMachi = machiIds.size === 0 || machiIds.has(haiId);
  const isNotFour = !fourIds.has(haiId);

  return isMachi && isNotFour && isNotNakiLimit(ctx);
}

export default function TehaiInputView({ hais, allTiles, machiHais, nakiMode, onAddHai }: { hais: Hais, allTiles: Hai[], machiHais: Hai[], nakiMode: NakiMode, onAddHai: (id: number) => void }){
  const rows = Array.from({length: 4}, (_, r) => 
    Array.from({length: 9}, (_, c) => r * 9 + c)
  );
  const fourHais = getUsedLimitHais(hais, 0);
  const fourIds = new Set(fourHais.map(h => h.getId()));
  const machiIds = new Set(machiHais.map(h => h.getId()));
  
  return (
    <div className='tehai_input'>
      {rows.map((row, r) => (
        <div key={r} className='tehai_row'>
        {row
          .filter(i => !(r === 3 && i % 9 >= 7))
          .map(i => (
          <div key={i} className='tehai_cell'>
          {canShowTile({haiId: i + 1, hais, fourIds, machiIds, nakiMode})
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