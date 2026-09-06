import {resType} from '../modules/TypeDefs';

export default function ResultView({ result, setShowResult }: { result: resType | undefined, setShowResult: (isShow: boolean) => void}){
  if(!result) return null;
  if(!result.yakuMapObj) return (<div><p>役が成立していません</p></div>);
  return (
    <div className='result_views fade_in'>
      <div className='result_view'>
        <h2>役</h2>
        <p>{result.scoreResultObj.han}翻</p>
        <ul>
          {Object.entries(result.yakuMapObj).map(([name, han], index) => (
            <li key={index}>{name} ({han}翻)</li>
          ))}
        </ul>
      </div>
      <div className='result_view'>
        <h2>符</h2>
        <p>{result.scoreResultObj.fuCeiled}符({result.scoreResultObj.fuBasic})</p>
        <ul>
          {result.scoreResultObj.fuDetail.map((value, index) => (
            <li key={index}>{value.name} {value.fu}符 {value.minHaiId}</li>
          ))}
        </ul>
      </div>
      <div className='result_view'>
        <h2>点数</h2>
        <p>親ロン: {result.scoreResultObj.tensuu.ronOya}</p>
        <p>子ロン: {result.scoreResultObj.tensuu.ronKo}</p>
        <p>親ツモ: {result.scoreResultObj.tensuu.tsumoOya}オール</p>
        <p>子ツモ: 親{result.scoreResultObj.tensuu.tsumoKo.oya} / 子{result.scoreResultObj.tensuu.tsumoKo.ko}</p>
      </div>
      <div className='close_btn' onClick={() => setShowResult(false)}>閉じる</div>
    </div>
  );
}