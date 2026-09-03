import {Hai, Meld, Melds} from 'mahjong_engine';
import {Hais} from 'mahjong_engine';
import {MachiCalculator} from 'mahjong_engine';
import {MeldType} from 'mahjong_engine';
import {useState} from 'react';
import {useMemo} from 'react';

import './App.css';
import NakiButtons from './components/NakiButtons';
import TehaiView from './components/TehaiView';
import TehaiInputView from './components/TehaiInputView';
import ResultView from './components/ResultView';

import {NakiMode, resType} from './TypeDefs';
import NakiView from './components/NakiView';

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

function getMeldType(nakiMode: NakiMode): MeldType{
  if(nakiMode.chi) return MeldType.CHI;
  if(nakiMode.pon) return MeldType.PON;
  if(nakiMode.minkan) return MeldType.MINKAN;
  if(nakiMode.ankan) return MeldType.ANKAN;
  return MeldType.PON;
}

function App() {
  const [hais, setHaiIds] = useState<Hais>(new Hais());
  const [melds, setMelds] = useState<Meld[]>([]);
  const [machiHais, setmachiHais] = useState<Hai[]>([]);
  const [result, setResult] = useState<resType>();
  const [loading, setLoading] = useState(false);
  const [nakiMode, setNakiMode] = useState({
    none: true,
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
  };

  const addMelds = (id: number) => {
    setMelds(prev => [...prev, Meld.from(id, getMeldType(nakiMode))]);
  };

  const addHai = (id: number) => updateHais(h => h.push(id));
  const removeHai = (id: number) => updateHais(h => h.remove(id));

  return (
    <div className="App">
      <TehaiView hais={hais} onRemoveHai={removeHai} />
      {loading && <div><div className="loader"></div><p className='loader_text'>表示までしばらくお待ちください...</p></div>}
      <ResultView result={result} />
      <TehaiInputView hais={hais} allTiles={allTiles} machiHais={machiHais} nakiMode={nakiMode} onAddHai={addHai} addMelds={addMelds} />
      <NakiButtons nakiMode={nakiMode} setNakiMode={setNakiMode} />
      <NakiView melds={melds} allTiles={allTiles} />
    </div>
  );
}

export default App;
