import { useState } from "react";
import { Radio } from "../modules/TypeDefs";

export default function SettingRadioBtn(props : {name: string, radio: Radio[]}){
  const [selected, setSelected] = useState<String>(props.radio[0].value);
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => setSelected(event.target.value);
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