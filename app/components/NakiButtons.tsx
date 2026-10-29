import { Mode, NakiKey, NakiMode } from '../modules/TypeDefs';
import style from './NakiButtons.module.css';

const nakiList: { key: NakiKey; label: string }[] = [
  { key: "chi", label: "チー" },
  { key: "pon", label: "ポン" },
  { key: "minkan", label: "明槓" },
  { key: "ankan", label: "暗槓" },
];

type NakiProps = {canNaki: boolean, haiLength: number, nakiMode: NakiMode, setMode: (mode: Mode) => void, setNakiMode: React.Dispatch<React.SetStateAction<NakiMode>>};

export default function NakiButtons({canNaki, nakiMode, setMode, setNakiMode}: NakiProps){
  const toggleExclusive = (key: NakiKey) => {
    setNakiMode(prev => {
      const isSame = prev[key] === true;

      if(isSame){
        setMode(Mode.Normal);
        return{none: true, chi: false, pon: false, minkan: false, ankan: false}
      }

      setMode(Mode.Naki);
      return{
        none: false,
        chi: key === "chi",
        pon: key === "pon",
        minkan: key === "minkan",
        ankan: key === "ankan",
      };
    });
  };
  
  return (
    <div className={style.naki_btn_list}>
      {nakiList.map(({key, label}) => (
        <div
          key={key}
          className={
            `btn_item
            ${style.naki_btn}
            ${style[`naki_btn_${key}`]}
            ${nakiMode[key] ? style.active : ""}
            ${canNaki ? "" : style.disable}`
          }
          onClick={() => {
            if(canNaki) toggleExclusive(key);
          }}
        >
          <p>{label}</p>
        </div>
      ))}
    </div>
  )
}