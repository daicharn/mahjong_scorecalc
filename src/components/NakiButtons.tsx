import { Mode, NakiKey, NakiMode } from '../modules/TypeDefs';

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
    <div className='naki_btn_list'>
      {nakiList.map(({key, label}) => (
        <div
          key={key}
          className={`naki_btn naki_btn_${key} ${nakiMode[key] ? "active": ""} ${canNaki ? "" : "disable"}`}
          onClick={() => canNaki ? toggleExclusive(key) : ""}
        >
          {label}
        </div>
      ))}
    </div>
  )
}