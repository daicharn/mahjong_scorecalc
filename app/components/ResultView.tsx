import { BlockHais, BlockHaisList, BlockType, Hai, MachiType, Meld } from 'mahjong_engine';
import { AgariVal, blockRes, fuDetailObj, resType, Settings } from '../modules/TypeDefs';
import { NakiViewResult } from './NakiView';
import { ResultTableFusuu, ResultTableHonsuu } from './ResultTable';
import { MachiUtils } from '../modules/MachiUtils';

type TypeResult = { result: resType | undefined, melds: Meld[], agariHai: Hai, allTiles: Hai[], settings: Settings, setShowResult: (isShow: boolean) => void}

function blockEquals(a: BlockHais, b: BlockHais){
  const aHaiNums = a.getHais().map(h => h.getId());
  const bHaiNums = b.getHais().map(h => h.getId());
  const isSameType = a.getType() === b.getType();
  const isSameNums = JSON.stringify(aHaiNums) === JSON.stringify(bHaiNums)

  return isSameType && isSameNums;
}

function toBlockHaisList(blockObj: blockRes){
  const list = new BlockHaisList();
  blockObj.blocks.forEach(block => {
    const hais = block.hais.map(h => new Hai(h.id));
    const type = block.type;
    list.push(new BlockHais(hais, type));
  });

  return list;
}

function calcAgariIndexes(blocks: BlockHaisList, machiTypesBase: Map<MachiType, BlockHais>, fuDetail: fuDetailObj[], agariHaiId: number){
  const fuTypes: MachiType[] = [MachiType.KANCHAN, MachiType.PENCHAN, MachiType.TANKI];
  
  const detail = fuDetail.find(detail => detail.machiType !== undefined);
  const detailType = detail?.machiType;
 
  const fuMachi = [...machiTypesBase.entries()]
    .find(([machiType]) => fuTypes.includes(machiType));
  const nonFuMachi = [...machiTypesBase.entries()]
    .find(([machiType]) => !fuTypes.includes(machiType));

  const machi = detailType !== undefined ? fuMachi : nonFuMachi;
  if(!machi) throw new Error("machi not found");

  const [machiType, blockHais] = machi;

  const blockIndex = blocks.getBlockHais().findIndex(block => blockEquals(block, blockHais));
  const machiIndex = MachiUtils.calcMachiIndex(blockHais.getHais(), machiType, agariHaiId);

  return [blockIndex, machiIndex];
}

export default function ResultView(props : TypeResult){
  if(!props.result) return null;
  if(!props.result.yakuMapObj) return (<div><p>役が成立していません</p></div>);
  const blocks = toBlockHaisList(props.result.blockObj);
  const machiTypesBase = blocks.calcMachiType(props.agariHai.getId());
  const agariIndex = calcAgariIndexes(blocks, machiTypesBase, props.result.scoreResultObj.fuDetail, props.agariHai.getId());
  return (
    <div className='result_view fade_in'>
      <div className='result_tehai_outer'>
        <div className='result_tehai'>
          {blocks.getBlockHais().map((block, indexBlock) => {
            return (
              <div key={indexBlock} className="result_hai_block">
                {block.getHais().map((h, indexHai) => {
                  const isAgariHai = indexBlock === agariIndex[0] && indexHai === agariIndex[1];
                  return (
                    <div key={indexHai} className={`result_hai ${isAgariHai ? "agari" : ""}`}>
                      <img 
                        className={`result_hai_image ${isAgariHai ? "agari" : ""}`}
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