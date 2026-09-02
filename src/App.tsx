import {Hai} from 'mahjong_engine';
import {Hais} from 'mahjong_engine';
import {MachiCalculator} from 'mahjong_engine';
import {useState} from 'react';
import {useMemo} from 'react';

import './App.css';
import NakiButtons from './components/NakiButtons';
import HaisView from './components/HaisView';
import TehaiInputView from './components/TehaiInputView';
import ResultView from './components/ResultView';

import {resType, NakiMode} from './TypeDefs';

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

function calcLimitNum(nakiMode: NakiMode){
  if(nakiMode.pon) return 1;
  else if(nakiMode.minkan || nakiMode.ankan) return 0;
  else return 3;
}
function getUsedFourHais(hais: Hais, nakiMode: NakiMode): Hai[] {
  return hais.getHais().filter(h => hais.count(h.getId()) > calcLimitNum(nakiMode));
}

function App() {
  const [hais, setHaiIds] = useState<Hais>(new Hais());
  const [machiHais, setmachiHais] = useState<Hai[]>([]);
  const [result, setResult] = useState<resType>();
  const [loading, setLoading] = useState(false);
  const [nakiMode, setNakiMode] = useState({
    chi: false,
    pon: false,
    minkan: false,
    ankan: false
});

  const allTiles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => new Hai(i + 1));
  }, []);

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
      <HaisView hais={hais} onRemoveHai={removeHai} />
      {loading && <div><div className="loader"></div><p className='loader_text'>表示までしばらくお待ちください...</p></div>}
      <ResultView result={result} />
      <TehaiInputView allTiles={allTiles} machiHais={machiHais} fourHais={getUsedFourHais(hais, nakiMode)} onAddHai={addHai}/>
      <NakiButtons nakiMode={nakiMode} setNakiMode={setNakiMode} />
    </div>
  );
}

export default App;
