import {NakiKey, NakiMode} from '../modules/TypeDefs';

const nakiList: { key: NakiKey; label: string }[] = [
  { key: "chi", label: "チー" },
  { key: "pon", label: "ポン" },
  { key: "minkan", label: "明槓" },
  { key: "ankan", label: "暗槓" },
];


export default function NakiButtons({canNaki, nakiMode, setNakiMode}: {canNaki: boolean, haiLength: number, nakiMode: NakiMode, setNakiMode: React.Dispatch<React.SetStateAction<NakiMode>>}){
  const toggleExclusive = (key: NakiKey) => {
    if(!canNaki) return;

    setNakiMode(prev => {
      const isSame = prev[key] === true;

      if(isSame){
        return{none: true, chi: false, pon: false, minkan: false, ankan: false}
      }

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