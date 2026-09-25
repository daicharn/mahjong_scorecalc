type TypeNoten = {shanten: number};

export default function NotenModal(props: TypeNoten){
    return (
      <div className="noten_modal">
        <h2>{`${props.shanten}`}向聴</h2>
        <p>手牌をクリックして一枚削除してください</p>
      </div>
    )
}