"use client";

import {Hai, Meld, PlayerHand, ShantenCalculator, TILE} from 'mahjong_engine';
import {Hais} from 'mahjong_engine';
import {MachiCalculator} from 'mahjong_engine';
import {useState} from 'react';
import {useMemo} from 'react';

import './App.css';
import NakiButtons from './components/NakiButtons';
import TehaiView from './components/TehaiView';
import TehaiInputView from './components/TehaiInputView';
import ResultView from './components/ResultView';
import NakiView from './components/NakiView';
import SettingsView from './components/SettingsView';

import { AgariVal, BoolVal, Mode, OtherVal, resType, RiichiVal, Settings, WindVal } from './modules/TypeDefs';
import { MahjongAPIGetter } from './modules/MahjongAPIGetter';
import { MeldUtils } from './modules/MeldUtils';
import { MapSettingsToContext } from './modules/MapSettingsToContext';
import NotenModal from './components/NotenModal';

function App() {
  const [hais, setHais] = useState<Hais>(new Hais());
  const [melds, setMelds] = useState<Meld[]>([]);
  const [machiHais, setmachiHais] = useState<Hai[]>([]);
  const [result, setResult] = useState<resType>();
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.Normal);
  const [showSettings, setShowSettings] = useState(false);
  const [isMenzen, setIsMenzen] = useState<boolean>(true);
  const [hasKantsu, setHasKantsu] = useState<boolean>(false);
  const [nakiMode, setNakiMode] = useState({
    none: true,
    chi: false,
    pon: false,
    minkan: false,
    ankan: false
  });
  const [settings, setSettings] = useState<Settings>({
    agari: AgariVal.Tsumo,
    riichi: RiichiVal.None,
    ippatsu: BoolVal.False,
    playerwind: WindVal.EAST,
    roundwind: WindVal.EAST,
    other: OtherVal.None,
    dora: 0
  });

  const HaiNum = 14 - (melds.length * 3);
  const canNaki = HaiNum - hais.length > 4;

  const allTiles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => new Hai(i + 1));
  }, []);

  const updateMode = (newHais: Hais) => {
    if(newHais.length === HaiNum){
      setMode(Mode.Agari);
      return;
    }

    if(mode === Mode.Agari || mode === Mode.Noten){
      setMode(Mode.Normal);
      setResult(undefined);
    }
  };

  const updateMachiAndShanten = (newHais: Hais) => {
    if(newHais.length === HaiNum - 1){
      const machiHais = new MachiCalculator(newHais.getHais())
        .calculate()
        .map(m => new Hai(m));

      setmachiHais(machiHais);

      if(machiHais.length === 0){
        const shanten = new ShantenCalculator(newHais.getHais()).calculate();
        if(shanten >= 1) setMode(Mode.Noten);
      }
    }
    else{
      setmachiHais([]);
    }
  }

  const updateHais = async (fn: (h: Hais) => void) => {
    const newHais = new Hais(hais.ids);
    fn(newHais);
    newHais.sort();

    updateMode(newHais);
    updateMachiAndShanten(newHais);
    setHais(newHais);
  };

  const showResultView = async (agariHaiId: number) => {
      setLoading(true);
      try{
        const ctx = new MapSettingsToContext(new Hai(agariHaiId), settings).toContext();
        const data = await new MahjongAPIGetter("https://mahjong-api.daicharn.deno.net/calc", hais.ids, melds, ctx).get();
        setResult(data);
        setShowResult(true);
      }
      finally{
        setLoading(false);
      }
  };

  const addMelds = (id: number) => {
    const newMeld: Meld = Meld.from(id, MeldUtils.getMeldType(nakiMode));
    const nextMelds: Meld[] = [...melds, newMeld];
    setMelds(nextMelds);
    setIsMenzen(new PlayerHand(hais.getHais(), nextMelds).isMenzen());
    setHasKantsu(nextMelds.some(m => m.isKantsu()));

    const nextHaiNum = HaiNum - 3;
    const nextCanNaki = nextHaiNum - hais.length > 4;
    if (!nextCanNaki) {
      setMode(Mode.Normal);
      resetNakiMode();
    }
  };

  const removeMelds = (index: number) => {
    const nextMelds: Meld[] = melds.toSpliced(index, 1);
    setMode(Mode.Normal);
    resetNakiMode();
    setmachiHais([]);
    setMelds(nextMelds);
    setIsMenzen(new PlayerHand(hais.getHais(), nextMelds).isMenzen());
    setHasKantsu(nextMelds.some(m => m.isKantsu()));
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
    setMode(Mode.Normal);
    resetNakiMode();
    setHais(new Hais());
    setMelds([]);
    setmachiHais([]);
    setIsMenzen(true);
    setHasKantsu(false);
  };

  const updateSetting = (name: string, value: string | number) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="App">
      <TehaiView hais={hais} haiNum={HaiNum} onRemoveHai={removeHai} />
      <TehaiInputView hais={hais} melds={melds} allTiles={allTiles} machiHais={machiHais} nakiMode={nakiMode} mode={mode} onAddHai={addHai} addMelds={addMelds} showResultView={showResultView}/>
      <NakiButtons canNaki={canNaki} haiLength={hais.length} nakiMode={nakiMode} setMode={setMode} setNakiMode={setNakiMode} />
      <NakiView melds={melds} allTiles={allTiles} removeMelds={removeMelds} />
      <SettingsView isMenzen={isMenzen} hasKantsu={hasKantsu} settings={settings} showSettings={showSettings} setShowSettings={setShowSettings} setSettings={updateSetting}/>
      <div className='reset_btn' onClick={() => resetAll()}>リセット</div>
      {showResult && <ResultView result={result} melds={melds} allTiles={allTiles} settings={settings} setShowResult={setShowResult}/>}
      {(loading || showSettings) && <div className="overlay" onClick={() => setShowSettings(false)}></div>}
      {loading && <div className='loader'><div className="loader_icon"></div><p className='loader_text'>表示までしばらくお待ちください...</p></div>}
      {mode === Mode.Noten && <NotenModal shanten={new ShantenCalculator(hais.getHais()).calculate()} />}
    </div>
  );
}

export default App;
