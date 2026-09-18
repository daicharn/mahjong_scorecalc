import { useState } from "react";

type TypeStepper = {label: string, name: string, start: number, min: number, max: number, onChange: (name: string, value: number) => void};

export default function SettingsStepper(props: TypeStepper){
    const [num, setNum] = useState<number>(props.start);

    const updateNum = (num: number) => {
      setNum(num);
      props.onChange(props.name, num);
    }

    return(
        <div className="setting_item">
          <p className="stepper_label">{props.label}</p>
          <div className="setting_stepper">
            <p className="doranum_box">{num}</p>
            <button className={`${num <= props.min ? "disable": ""}`} onClick={() => updateNum(num - 1)}>-</button>
            <button className={`${num >= props.max ? "disable": ""}`} onClick={() => updateNum(num + 1)}>+</button>
          </div>
        </div>
    );
}