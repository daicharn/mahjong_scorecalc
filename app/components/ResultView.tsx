import { Hai, Meld } from 'mahjong_engine';
import {resType} from '../modules/TypeDefs';
import { NakiViewResult } from './NakiView';

export default function ResultView({ result, melds, allTiles, setShowResult }: { result: resType | undefined, melds: Meld[], allTiles: Hai[] ,setShowResult: (isShow: boolean) => void}){
  if(!result) return null;
  if(!result.yakuMapObj) return (<div><p>役が成立していません</p></div>);
  return (
    <div className='result_view fade_in'>
      <div className='result_tehai_outer'>
        <div className='result_tehai'>
          {result.blockObj.blocks.map((block, i) => (
            <div key={i} className="result_hai">
              {block.hais.map((h, i) => (
                <img key={i} className='result_hai_image' src={"images/" + allTiles[h.id - 1].imageUrl}></img>
              ))}
            </div>
          ))}
          <NakiViewResult melds={melds} allTiles={allTiles} />
        </div>
      </div>
      <div className='result_details'>
        <div className='result_detail'>
          <h2>役</h2>
          <p>{result.scoreResultObj.han}翻</p>
          <ul>
            {Object.entries(result.yakuMapObj).map(([name, han], index) => (
              <li key={index}>{name} ({han}翻)</li>
            ))}
          </ul>
        </div>
        <div className='result_detail'>
          <h2>符</h2>
          <p>{result.scoreResultObj.fuCeiled}符({result.scoreResultObj.fuBasic})</p>
          <ul>
            {result.scoreResultObj.fuDetail.map((value, index) => (
              <li key={index}>{value.name} {value.fu}符 {value.minHaiId}</li>
            ))}
          </ul>
        </div>
        <div className='result_detail'>
          <h2>点数</h2>
          <p>親ロン: {result.scoreResultObj.tensuu.ronOya}</p>
          <p>子ロン: {result.scoreResultObj.tensuu.ronKo}</p>
          <p>親ツモ: {result.scoreResultObj.tensuu.tsumoOya}オール</p>
          <p>子ツモ: 親{result.scoreResultObj.tensuu.tsumoKo.oya} / 子{result.scoreResultObj.tensuu.tsumoKo.ko}</p>
        </div>
      </div>
      <div className='close_btn' onClick={() => setShowResult(false)}>閉じる</div>
    </div>
  );
}