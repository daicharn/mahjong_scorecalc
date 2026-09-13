import { Radio } from "../modules/TypeDefs";
import SettingRadioBtn from "./SettingsRadioBtn";

type SettingsProps = {showSettings: boolean, setShowSettings: (isShow: boolean) => void};

const agariButtons: Radio[] = [
    {
      label: "ツモ",
      value: "tsumo"
    },
    {
      label: "ロン",
      value: "ron"
    }
]

const riichiButtons: Radio[] = [
    {
      label: "なし",
      value: "none"
    },
    {
      label: "立直",
      value: "riichi"
    },
    {
      label: "ダブル立直",
      value: "daburii"
    },
]

const radioButtons: Radio[] = [
    {
      label: "東",
      value: "east"
    },
    {
      label: "南",
      value: "south"
    },
    {
      label: "西",
      value: "west"
    },
    {
      label: "北",
      value: "north"
    }
]

export default function SettingsVIew(props: SettingsProps){
  return (
    <div className={`settings_view ${props.showSettings ? "open" : ""}`}>
      <div className="settings_panel">
        <p>アガリ</p>
        <SettingRadioBtn name={"agari"} radio={agariButtons}/>
        <p>立直</p>
        <SettingRadioBtn name={"riichi"} radio={riichiButtons}/>
        <p>自風</p>
        <SettingRadioBtn name={"playerwind"} radio={radioButtons}/>
        <p>場風</p>
        <SettingRadioBtn name={"roundwind"} radio={radioButtons}/>
      </div>
      <div className="settings_tab" onClick={() => props.setShowSettings(!props.showSettings)}>
      </div>
    </div>
  );
}