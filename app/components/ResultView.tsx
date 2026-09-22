import { Hai, Meld } from 'mahjong_engine';
import { AgariVal, resType, Settings } from '../modules/TypeDefs';
import { NakiViewResult } from './NakiView';

type TypeResult = { result: resType | undefined, melds: Meld[], allTiles: Hai[], settings: Settings, setShowResult: (isShow: boolean) => void}

export default function ResultView(props : TypeResult){
  if(!props.result) return null;
  if(!props.result.yakuMapObj) return (<div><p>役が成立していません</p></div>);
  return (
    <div className='result_view fade_in'>
      <div className='result_tehai_outer'>
        <div className='result_tehai'>
          {props.result.blockObj.blocks.map((block, i) => (
            <div key={i} className="result_hai">
              {block.hais.map((h, i) => (
                <img key={i} className='result_hai_image' src={"images/" + props.allTiles[h.id - 1].imageUrl}></img>
              ))}
            </div>
          ))}
          <NakiViewResult melds={props.melds} allTiles={props.allTiles} />
        </div>
      </div>
      <div className='result_tensuu'>
        {props.settings.agari === AgariVal.Tsumo ?
          <>
            <p>ツモ</p>
            <p>親: {props.result.scoreResultObj.tensuu.tsumoOya}ALL</p>
            <p>子: {props.result.scoreResultObj.tensuu.tsumoKo.oya} / {props.result.scoreResultObj.tensuu.tsumoKo.ko}</p>
          </>
          :
          <>
            <p>ロン</p>
            <p>親: {props.result.scoreResultObj.tensuu.ronOya}</p>
            <p>子: {props.result.scoreResultObj.tensuu.ronKo}</p>
          </>
        }
      </div>
      <div className='result_details'>
        <div className='result_detail'>
          <h2>役</h2>
          <p>{props.result.scoreResultObj.han}翻</p>
          <ul>
            {Object.entries(props.result.yakuMapObj).map(([name, han], index) => (
              <li key={index}>{name} ({han}翻)</li>
            ))}
          </ul>
        </div>
        <div className='result_detail'>
          <h2>符</h2>
          <p>{props.result.scoreResultObj.fuCeiled}符({props.result.scoreResultObj.fuBasic})</p>
          <ul>
            {props.result.scoreResultObj.fuDetail.map((value, index) => (
              <li key={index}>{value.name} {value.fu}符 {value.minHaiId}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='close_btn' onClick={() => props.setShowResult(false)}>閉じる</div>
    </div>
  );
}