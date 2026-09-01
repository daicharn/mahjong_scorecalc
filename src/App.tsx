import {Hai} from 'mahjong_engine';
import {Hais} from 'mahjong_engine';
import {YakuContext} from 'mahjong_engine';
import {MachiCalculator} from 'mahjong_engine';
import {useState} from 'react';

import './App.css';

type scoreRes = {
    han: number,
    fuBasic: number,
    fuCeiled: number,
    tensuu: {
      ronOya: number,
      ronKo: number,
      tsumoOya: number,
      tsumoKo: {
        oya: number,
        ko: number
      }
    },
    fuDetail: {
      name: string,
      fu: number,
      mentsuType?: number,
      minHaiId?: number
    }[]
}

type resType = {contextMax: YakuContext, yakuMapObj: Record<string, number>, scoreResultObj: scoreRes};

async function GetCalcData(haiids: number[]){
  const res = await fetch("https://mahjong-api.daicharn.deno.net/calc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      haiIds: haiids
    })
  });

  const data: resType = await res.json();
  return data;
}

function TehaiInputView({ onAddHai }: { onAddHai: (id: number) => void }){
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
          <img src={"images/" + new Hai(i + 1).imageUrl} onClick={() => onAddHai(i + 1)}></img>
          </div>
        ))}
        </div>
      ))}
    </div>
  );
}

function ResultView({ result }: { result: resType | undefined }){
  if(!result) return null;
  if(!result.yakuMapObj) return (<div><p>役が成立していません</p></div>);
  return (
    <div className='result_views'>
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
    </div>
  );
}

function HaisView({ hais, onRemoveHai }: { hais: Hais, onRemoveHai: (id: number) => void }){
  return (
    <div>
      {hais.length !== 0 && <h2>手牌</h2>}
      <div className="hais">
        {hais.getHais().map((h, i) => (
        <div className="hai" key={i}>
        <img src={"images/" + h.imageUrl} onClick={() => onRemoveHai(h.getId())}></img>
        <p className="hai_text">{h.getId()}</p>
        </div>
        ))}
      </div>
    </div>
  );
}

function MachiHaisView({ machiHais }: { machiHais: Hai[]}){
  return (
    <div>
      {machiHais.length !== 0 && <h2>待ち牌</h2>}
      <div className="hais_machi">
        {machiHais.map((h, i) => (
        <div className="hai_machi" key={i}>
        <img src={"images/" + h.imageUrl} key={i}></img>
        </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [hais, setHaiIds] = useState<Hais>(new Hais());
  const [machiHais, setmachiHais] = useState<Hai[]>([]);
  const [result, setResult] = useState<resType>();
  const [loading, setLoading] = useState(false);

  const updateHais = async (fn: (h: Hais) => void) => {
    const newHais = new Hais(hais.ids);
    fn(newHais);
    newHais.sort();
    setHaiIds(newHais);

    if(newHais.length === 14){
      setLoading(true);

      const data = await GetCalcData(newHais.ids);
      setResult(data);

      setLoading(false);
    }
    else{
      setResult(undefined);
    }

    if(newHais.length === 13){
      //4枚の時の処理を追加予定
      const machiHais = new MachiCalculator(newHais.getHais()).calculate().map(m => new Hai(m));
      setmachiHais(machiHais);
    }
    else{
      setmachiHais([]);
    }
  }

  const addHai = (id: number) => updateHais(h => h.push(id));
  const removeHai = (id: number) => updateHais(h => h.remove(id));

  return (
    <div className="App">
      <h1>麻雀点数計算テスト</h1>
      
      <HaisView hais={hais} onRemoveHai={removeHai} />
      <MachiHaisView machiHais={machiHais} />
      {loading && <div><div className="loader"></div><p className='loader_text'>表示までしばらくお待ちください...</p></div>}
      <ResultView result={result} />
      <TehaiInputView onAddHai={addHai}/>
      
    </div>
  );
}

export default App;
