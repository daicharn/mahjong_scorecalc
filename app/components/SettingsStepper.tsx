import { useState } from "react";

type TypeStepper = {label: string, start: number, min: number, max: number};

export default function SettingsStepper(props: TypeStepper){
    const [num, setNum] = useState<number>(props.start);

    return(
        <div className="setting_item">
          <p className="stepper_label">{props.label}</p>
          <div className="setting_stepper">
            <p className="doranum_box">{num}</p>
            <button className={`${num <= props.min ? "disable": ""}`} onClick={() => setNum(num - 1)}>-</button>
            <button className={`${num >= props.max ? "disable": ""}`} onClick={() => setNum(num + 1)}>+</button>
          </div>
        </div>
    );
}