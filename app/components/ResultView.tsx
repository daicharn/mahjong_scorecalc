import { Hai, Meld } from 'mahjong_engine';
import { AgariVal, Mode, resType, Settings } from '../modules/TypeDefs';
import { NakiViewResult } from './NakiView';
import { ResultTableFusuu, ResultTableHonsuu } from './ResultTable';
import { AgariUtils } from '../modules/AgariUtils';
import { CommonUtils } from '../modules/CommonUtils';
import styles from './ResultView.module.css';

type TypeResult = {result: resType | undefined, melds: Meld[], agariHai: Hai, allTiles: Hai[], settings: Settings, setShowResult: (isShow: boolean) => void, setMode: (mode: Mode) => void}

export default function ResultView(props : TypeResult){
  if(!props.result || !props.result.yakuMapObj) return null;
  const blocks = CommonUtils.toBlockHaisList(props.result.blockObj);
  const machiTypesBase = blocks.calcMachiType(props.agariHai.getId());
  const agariIndex = AgariUtils.calcAgariIndex(blocks, machiTypesBase, props.result.scoreResultObj.fuDetail, props.agariHai.getId());
  return (
    <div className={styles.result_view}>
      <div className={styles.result_tehai_outer}>
        <div className={styles.result_tehai}>
          {blocks.getBlockHais().map((block, indexBlock) => {
            return (
              <div key={indexBlock} className={styles.result_hai_block}>
                {block.getHais().map((h, indexHai) => {
                  const isAgariHai = indexBlock === agariIndex[0] && indexHai === agariIndex[1];
                  return (
                    <div key={indexHai}>
                      <img 
                        className={`${styles.hai_image_result} ${isAgariHai ? styles.agari : ""}`}
                        src={"images/" + props.allTiles[h.getId() - 1].imageUrl}>
                      </img>
                    </div>
                  )
                })}
              </div>
            )
          })}
          <NakiViewResult melds={props.melds} allTiles={props.allTiles} />
        </div>
      </div>
      <div className={styles.result_tensuu}>
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
      <div className={styles.result_details}>
        <div className='result_detail'>
          <ResultTableHonsuu 
            scoreResult={props.result.scoreResultObj}
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
      <div className='close_btn btn_item' onClick={() => props.setShowResult(false)}><p>閉じる</p></div>
    </div>
  );
}