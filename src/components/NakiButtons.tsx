type NakiKey = "chi" | "pon" | "minkan" | "ankan";
type NakiMode = Record<NakiKey, boolean>;

const nakiList: { key: NakiKey; label: string }[] = [
  { key: "chi", label: "チー" },
  { key: "pon", label: "ポン" },
  { key: "minkan", label: "明槓" },
  { key: "ankan", label: "暗槓" },
];


export default function NakiButtons({nakiMode, setNakiMode}: {nakiMode: NakiMode, setNakiMode: React.Dispatch<React.SetStateAction<NakiMode>>}){
  const toggleExclusive = (key: NakiKey) => {
    setNakiMode(prev => {
      const isSame = prev[key] === true;

      if(isSame){
        return{chi: false, pon: false, minkan: false, ankan: false}
      }

      return{
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
          className={`naki_btn naki_btn_${key} ${nakiMode[key] ? "active": ""}`}
          onClick={() => toggleExclusive(key)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}