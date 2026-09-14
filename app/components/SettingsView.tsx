import { AgariVal, BoolVal, Radio, RiichiVal, WindVal } from "../modules/TypeDefs";
import SettingRadioBtn from "./SettingsRadioBtn";

type SettingsProps = {isMenzen: boolean, nonRiichi: boolean, showSettings: boolean, setShowSettings: (isShow: boolean) => void, setSettings: (name: string, value: string) => void};

const agariButtons: Radio[] = [
    {
      label: "ツモ",
      value: AgariVal.Tsumo
    },
    {
      label: "ロン",
      value: AgariVal.Ron
    }
]

const riichiButtons: Radio[] = [
    {
      label: "なし",
      value: RiichiVal.None
    },
    {
      label: "立直",
      value: RiichiVal.Riichi
    },
    {
      label: "ダブル立直",
      value: RiichiVal.Daburii
    }
]

const ippatsuButtons: Radio[] = [
  {
      label: "なし",
      value: BoolVal.False
    },
    {
      label: "あり",
      value: BoolVal.True
    }
]

const windButtons: Radio[] = [
    {
      label: "東",
      value: WindVal.EAST
    },
    {
      label: "南",
      value: WindVal.SOUTH
    },
    {
      label: "西",
      value: WindVal.WEST
    },
    {
      label: "北",
      value: WindVal.NORTH
    }
]

export default function SettingsView(props: SettingsProps){
  return (
    <div className={`settings_view ${props.showSettings ? "open" : ""}`}>
      <div className="settings_panel">
        <p>アガリ</p>
        <SettingRadioBtn name={"agari"} radio={agariButtons} onChange={props.setSettings} />
        <p>立直</p>
        <SettingRadioBtn name={"riichi"} radio={riichiButtons} disable={!props.isMenzen} onChange={props.setSettings} />
        <p style={{display: props.nonRiichi ? "none": "block"}}>一発</p>
        <SettingRadioBtn name={"ippatsu"} radio={ippatsuButtons} noDisplay={props.nonRiichi} onChange={props.setSettings} />
        <p>自風</p>
        <SettingRadioBtn name={"playerwind"} radio={windButtons} onChange={props.setSettings} />
        <p>場風</p>
        <SettingRadioBtn name={"roundwind"} radio={windButtons} onChange={props.setSettings}/>
      </div>
      <div className="settings_tab" onClick={() => props.setShowSettings(!props.showSettings)}>
      </div>
    </div>
  );
}