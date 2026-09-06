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

import {NakiMode, resType} from './modules/TypeDefs';
import NakiView from './components/NakiView';
import { MahjongAPIGetter } from './modules/MahjongAPIGetter';
import { MeldUtils } from './modules/MeldUtils';

function App() {
  const [hais, setHaiIds] = useState<Hais>(new Hais());
  const [melds, setMelds] = useState<Meld[]>([]);
  const [machiHais, setmachiHais] = useState<Hai[]>([]);
  const [result, setResult] = useState<resType>();
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [nakiMode, setNakiMode] = useState({
    none: true,
    chi: false,
    pon: false,
    minkan: false,
    ankan: false
  });

  const HaiNum = 14 - (melds.length * 3);
  const canNaki = HaiNum - hais.length > 4;

  const allTiles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => new Hai(i + 1));
  }, []);

  const updateHais = async (fn: (h: Hais) => void) => {
    const newHais = new Hais(hais.ids);
    fn(newHais);
    newHais.sort();
    setHaiIds(newHais);

    if(newHais.length === HaiNum){
      setLoading(true);
      try{
        const data = await new MahjongAPIGetter("https://mahjong-api.daicharn.deno.net/calc", newHais.ids, melds).get();
        setResult(data);
        setShowResult(true);
      }
      finally{
        setLoading(false);
      }
    }
    else{
      setResult(undefined);
    }

    if(newHais.length === HaiNum - 1){
      const machiHais = new MachiCalculator(newHais.getHais()).calculate().map(m => new Hai(m));
      setmachiHais(machiHais);
    }
    else{
      setmachiHais([]);
    }
  };

  const addMelds = (id: number) => {
    setMelds(prev => [...prev, Meld.from(id, MeldUtils.getMeldType(nakiMode))]);
  };

  const removeMelds = (index: number) => {
    setMelds(prev => prev.toSpliced(index, 1));
  };

  const addHai = (id: number) => updateHais(h => h.push(id));
  const removeHai = (id: number) => updateHais(h => h.remove(id));

  const resetNakiMode = () => setNakiMode({
      none: true,
      chi: false,
      pon: false,
      minkan: false,
      ankan: false,
  });

  const resetAll = () => {
    resetNakiMode();
    setHaiIds(new Hais());
    setMelds([]);
    setmachiHais([]);
  }
  
  if (!canNaki && !nakiMode.none) {
    resetNakiMode();
  }

  return (
    <div className="App">
      <TehaiView hais={hais} haiNum={HaiNum} onRemoveHai={removeHai} />
      <TehaiInputView hais={hais} melds={melds} allTiles={allTiles} machiHais={machiHais} nakiMode={nakiMode} onAddHai={addHai} addMelds={addMelds} />
      <NakiButtons canNaki={canNaki} haiLength={hais.length} nakiMode={nakiMode} setNakiMode={setNakiMode} />
      <NakiView melds={melds} allTiles={allTiles} removeMelds={removeMelds} />
      <div className='reset_btn' onClick={() => resetAll()}>すべてリセット</div>
      {showResult && <ResultView result={result} setShowResult={setShowResult}/>}
      {loading && <div className="overlay"></div>}
      {loading && <div className='loader'><div className="loader_icon"></div><p className='loader_text'>表示までしばらくお待ちください...</p></div>}
    </div>
  );
}

export default App;
