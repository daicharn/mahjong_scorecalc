import { useState } from "react";
import { Radio } from "../modules/TypeDefs";

type TypeRadio = {name: string, radio: Radio[], disable: boolean, onChange: (name: string, value: string) => void}

export default function SettingRadioBtn(props : TypeRadio){
  const [selected, setSelected] = useState<String>(props.radio[0].value);
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelected(value);
    props.onChange(props.name, value);
  }

  if(props.disable && selected !== props.radio[0].value){
    setSelected(props.radio[0].value);
  }

  return (
    <div className={`setting_radio ${props.name}`}>
      {props.radio.map((r, i) => {
        const isActive = props.disable ? i === 0 : r.value === selected;
        const isDisable = props.disable;
        return (
          <label key={i} className={`radio_box ${isActive ? "active" : ""} ${isDisable ? "disable": ""}`}>
            <input type="radio" name={props.name} value={r.value} 
              checked={isActive} onChange={isDisable ? undefined : changeValue}/>
            {r.label}
          </label>
        );
      })}
    </div>
  );
}