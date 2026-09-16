import { useEffect, useState } from "react";
import { Radio } from "../modules/TypeDefs";

type TypeRadio = {label: string, name: string, radio: Radio[], hidden?: boolean, onChange: (name: string, value: string) => void}

export default function SettingRadioBtn(props : TypeRadio){
  const [selected, setSelected] = useState<string>(props.radio[0].value);
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelected(value);
    props.onChange(props.name, value);
  }

  useEffect(() => {
    const init = props.radio[0].value;
    if (props.hidden && selected !== init) {
      setSelected(init);
      props.onChange(props.name, init);
    }
  }, [props.hidden]);

  useEffect(() => {
    const target = props.radio.find(r => r.value === selected);
    const init = props.radio[0].value;

    if (target?.disable) {
      setSelected(init);
      props.onChange(props.name, init);
    }
  }, [props.radio]);

  return (
    <div className={`setting_item ${props.hidden ? "hidden" : ""}`}>
      <p>{props.label}</p>
      <div className={`setting_radio ${props.name}`}>
        {props.radio.map((r, i) => {
          const isActive = r.disable ? i === 0 : r.value === selected;
          const isDisable = r.disable;
          return (
            <label key={i} className={`radio_box ${isActive ? "active" : ""} ${isDisable ? "disable": ""}`}>
              <input type="radio" name={props.name} value={r.value} 
                checked={isActive} onChange={isDisable ? undefined : changeValue} readOnly={isDisable}/>
              {r.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}