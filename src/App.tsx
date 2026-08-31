import {Hais} from 'mahjong_engine';
import {YakuContext} from 'mahjong_engine';
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
  
  
  const res = await fetch("https://mahjong-api-6ygb.onrender.com/calc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      haiIds: haiids
    })
  });

  const data: resType = await res.json();
  console.log(JSON.stringify(data, null, 2));
  return data;
}

function ResultView({ result }: { result: resType | undefined }){
  if(!result) return null;
  if(!result.yakuMapObj) return (<div><p>役が成立していません</p></div>);
  return (
    <div>
      <h2>役</h2>
      <p>{result.scoreResultObj.han}翻</p>
      <ul>
        {Object.entries(result.yakuMapObj).map(([name, han], index) => (
          <li key={index}>{name} ({han}翻)</li>
        ))}
      </ul>
      <h2>符</h2>
      <p>{result.scoreResultObj.fuCeiled}符({result.scoreResultObj.fuBasic})</p>
      <ul>
        {result.scoreResultObj.fuDetail.map((value, index) => (
          <li key={index}>{value.name} {value.fu}符 {value.minHaiId}</li>
        ))}
      </ul>
      <h2>点数</h2>
      <p>親ロン: {result.scoreResultObj.tensuu.ronOya}</p>
      <p>子ロン: {result.scoreResultObj.tensuu.ronKo}</p>
      <p>親ツモ: {result.scoreResultObj.tensuu.tsumoOya}オール</p>
      <p>子ツモ: 親{result.scoreResultObj.tensuu.tsumoKo.oya} / 子{result.scoreResultObj.tensuu.tsumoKo.ko}</p>
    </div>
  );
}

function HaisView(hais: Hais){
  return (
    <div className="hais">
      {hais.getHais().map((h, i) => (
      <div className="hai">
      <img src={"images/" + h.imageUrl} key={i}></img>
      <p className="hai_text">{h.getId()}</p>
      </div>
      ))}
    </div>
  );
}

function App() {
  const [hais, setHaiIds] = useState<Hais>(new Hais());
  const [result, setResult] = useState<resType>();

  const addHai = async (id: number) => {
    hais.push(id);
    hais.sort();
    setHaiIds(new Hais(hais.ids));

    if(hais.ids.length === 14){
      const data = await GetCalcData(hais.ids);
      setResult(data);
    }
    else{
      setResult(undefined);
    }
  }
  const removeHai = async (id: number) => {
    hais.remove(id);
    hais.sort();
    setHaiIds(new Hais(hais.ids));

    if(hais.ids.length === 14){
      const data = await GetCalcData(hais.ids);
      setResult(data);
    }
    else{
      setResult(undefined);
    }
  }

  return (
    <div className="App">
      <h1>麻雀点数計算テスト</h1>
      <h2>手牌</h2>
      
      {HaisView(hais)}

      <input id="hai_input" type="number"></input>
      <button onClick={() => {
        const haiInput = document.getElementById("hai_input") as HTMLInputElement;
        const num = Number(haiInput.value);
        if(num > 0 && num <= 34) addHai(num);
      }}>
        追加
      </button>
      <button onClick={() => {
        const haiInput = document.getElementById("hai_input") as HTMLInputElement;
        const num = Number(haiInput.value);
        if(num > 0 && num <= 34) removeHai(num);
      }}>
        削除
      </button>
      
      <ResultView result={result} />
      
    </div>
  );
}

export default App;
