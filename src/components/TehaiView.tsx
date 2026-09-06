import {Hai} from 'mahjong_engine';
import {Hais} from 'mahjong_engine';
import {TILE} from 'mahjong_engine';

export default function TehaiView({ hais, haiNum, onRemoveHai }: { hais: Hais, haiNum: number, onRemoveHai: (id: number) => void }){
  return (
    <div className="hais">
      {hais.getHais().map((h, i) => (
      <div className="hai" key={i}>
        <img className='hai_image' src={"images/" + h.imageUrl} onClick={() => onRemoveHai(h.getId())}></img>
      </div>
      ))}
      {Array(haiNum - hais.length).fill(0).map((_, i) => (
      <div className="hai" key={i}>
        <img className='hai_image' src={"images/" + new Hai(TILE.BACK).imageUrl}></img>
      </div>
      ))
      }
    </div>
  );
}