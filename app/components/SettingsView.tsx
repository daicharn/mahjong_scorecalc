import { useState } from "react";
import { AgariVal, Radio, RiichiVal, WindVal } from "../modules/TypeDefs";
import SettingRadioBtn from "./SettingsRadioBtn";

type SettingsProps = {isMenzen: boolean, showSettings: boolean, setShowSettings: (isShow: boolean) => void, setSettings: (name: string, value: string) => void};

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
    },
]

const radioButtons: Radio[] = [
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

export default function SettingsVIew(props: SettingsProps){
  return (
    <div className={`settings_view ${props.showSettings ? "open" : ""}`}>
      <div className="settings_panel">
        <p>アガリ</p>
        <SettingRadioBtn name={"agari"} radio={agariButtons} disable={false} onChange={props.setSettings} />
        <p>立直</p>
        <SettingRadioBtn name={"riichi"} radio={riichiButtons} disable={!props.isMenzen} onChange={props.setSettings} />
        <p>自風</p>
        <SettingRadioBtn name={"playerwind"} radio={radioButtons} disable={false} onChange={props.setSettings} />
        <p>場風</p>
        <SettingRadioBtn name={"roundwind"} radio={radioButtons} disable={false} onChange={props.setSettings}/>
      </div>
      <div className="settings_tab" onClick={() => props.setShowSettings(!props.showSettings)}>
      </div>
    </div>
  );
}