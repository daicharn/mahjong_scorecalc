import {Hai} from 'mahjong_engine';
import {Hais} from 'mahjong_engine';
import {TILE} from 'mahjong_engine';

export default function TehaiView({ hais, onRemoveHai }: { hais: Hais, onRemoveHai: (id: number) => void }){
  return (
    <div className="hais">
      {hais.getHais().map((h, i) => (
      <div className="hai" key={i}>
        <img src={"images/" + h.imageUrl} onClick={() => onRemoveHai(h.getId())}></img>
      </div>
      ))}
      {Array(14 - hais.length).fill(0).map((_, i) => (
      <div className="hai" key={i}>
        <img src={"images/" + new Hai(TILE.BACK).imageUrl}></img>
      </div>
      ))
      }
    </div>
  );
}