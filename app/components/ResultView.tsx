import { Hai, Meld } from 'mahjong_engine';
import { AgariVal, resType, Settings } from '../modules/TypeDefs';
import { NakiViewResult } from './NakiView';
import { ResultTableFusuu, ResultTableHonsuu } from './ResultTable';

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
          <ResultTableHonsuu 
            han={props.result.scoreResultObj.han}
            yakuArray={Object.entries(props.result.yakuMapObj)}
            allTiles={props.allTiles}
          />
        </div>
        <div className='result_detail'>
          <ResultTableFusuu 
            fuCeiled={props.result.scoreResultObj.fuCeiled}
            fuBasic={props.result.scoreResultObj.fuBasic}
            fuDetail={props.result.scoreResultObj.fuDetail}
            allTiles={props.allTiles}
          />
        </div>
      </div>
      <div className='close_btn' onClick={() => props.setShowResult(false)}>閉じる</div>
    </div>
  );
}