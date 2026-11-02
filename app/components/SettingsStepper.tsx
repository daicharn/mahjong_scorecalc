import { useState } from "react";
import styles from './SettingsStepper.module.css';
import styles_parts from './SettingsParts.module.css';

type TypeStepper = {label: string, name: string, start: number, min: number, max: number, onChange: (name: string, value: number) => void};

export default function SettingsStepper(props: TypeStepper){
    const [num, setNum] = useState<number>(props.start);

    const updateNum = (num: number) => {
      setNum(num);
      props.onChange(props.name, num);
    }

    return(
        <div className={styles.setting_item}>
          <p className={styles.stepper_label}>{props.label}</p>
          <div className={styles.setting_stepper}>
            <p className={styles.doranum_box}>{num}</p>
            <button className={`${styles_parts.setting_parts} ${num <= props.min ? styles_parts.disable : ""}`} onClick={() => updateNum(num - 1)}>-</button>
            <button className={`${styles_parts.setting_parts} ${num >= props.max ? styles_parts.disable : ""}`} onClick={() => updateNum(num + 1)}>+</button>
          </div>
        </div>
    );
}