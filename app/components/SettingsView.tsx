import { AgariVal, BoolVal, OtherVal, Radio, RiichiVal, WindVal } from "../modules/TypeDefs";
import SettingRadioBtn from "./SettingsRadioBtn";

type SettingsProps = {isMenzen: boolean, nonRiichi: boolean, showSettings: boolean, setShowSettings: (isShow: boolean) => void, setSettings: (name: string, value: string) => void};

export default function SettingsView(props: SettingsProps){
  const agariButtons: Radio[] = [
    {
      label: "ツモ",
      value: AgariVal.Tsumo,
      disable: false
    },
    {
      label: "ロン",
      value: AgariVal.Ron,
      disable: false
    }
  ]

  const riichiButtons: Radio[] = [
      {
        label: "なし",
        value: RiichiVal.None,
        disable: false
      },
      {
        label: "立直",
        value: RiichiVal.Riichi,
        disable: !props.isMenzen
      },
      {
        label: "ダブル立直",
        value: RiichiVal.Daburii,
        disable: !props.isMenzen
      }
  ]

  const ippatsuButtons: Radio[] = [
      {
        label: "なし",
        value: BoolVal.False,
        disable: false
      },
      {
        label: "あり",
        value: BoolVal.True,
        disable: false
      }
  ]

  const windButtons: Radio[] = [
      {
        label: "東",
        value: WindVal.EAST,
        disable: false
      },
      {
        label: "南",
        value: WindVal.SOUTH,
        disable: false
      },
      {
        label: "西",
        value: WindVal.WEST,
        disable: false
      },
      {
        label: "北",
        value: WindVal.NORTH,
        disable: false
      }
  ]
  
  const OtherButtons: Radio[] = [
      {
        label: "なし",
        value: OtherVal.None,
        disable: false
      },
      {
        label: "天和",
        value: OtherVal.Tenho,
        disable: false
      },
      {
        label: "地和",
        value: OtherVal.Chiho,
        disable: false
      },
      {
        label: "嶺上開花",
        value: OtherVal.Rinshan,
        disable: false
      },
      {
        label: "槍槓",
        value: OtherVal.chankan,
        disable: false
      },
      {
        label: "海底",
        value: OtherVal.haitei,
        disable: false
      },
      {
        label: "河底",
        value: OtherVal.houtei,
        disable: false
      }
  ]

  return (
    <div className={`settings_view ${props.showSettings ? "open" : ""}`}>
      <div className="settings_panel">
        <SettingRadioBtn label={"アガリ"} name={"agari"} radio={agariButtons} onChange={props.setSettings} />
        <SettingRadioBtn label={"立直"} name={"riichi"} radio={riichiButtons} onChange={props.setSettings} />
        <SettingRadioBtn label={"一発"} name={"ippatsu"} radio={ippatsuButtons} hidden={props.nonRiichi} onChange={props.setSettings} />
        <SettingRadioBtn label={"自風"} name={"playerwind"} radio={windButtons} onChange={props.setSettings} />
        <SettingRadioBtn label={"場風"} name={"roundwind"} radio={windButtons} onChange={props.setSettings}/>
        <SettingRadioBtn label={"特殊役"} name={"other"} radio={OtherButtons} onChange={props.setSettings}/>
      </div>
      <div className="settings_tab" onClick={() => props.setShowSettings(!props.showSettings)}>
      </div>
    </div>
  );
}