import { useState } from "react";
import { Radio } from "../modules/TypeDefs";

type TypeRadio = {name: string, radio: Radio[], onChange: (name: string, value: string) => void}

export default function SettingRadioBtn(props : TypeRadio){
  const [selected, setSelected] = useState<String>(props.radio[0].value);
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelected(value);
    props.onChange(props.name, value);
  }
  return (
    <div className={`setting_radio ${props.name}`}>
      {props.radio.map((r, i) => (
        <label key={i} className={`radio_box ${r.value === selected ? "active" : ""}`}>
          <input type="radio" name={props.name} value={r.value} 
            checked={r.value === selected} onChange={changeValue}/>
          {r.label}
        </label>
      ))}
    </div>
  );
}