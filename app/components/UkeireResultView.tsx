import { DiscardDetail, Hai } from "mahjong_engine";
import styles from "./UkeireResultView.module.css";

type TypeUkeireResult = { ukeireDetails: DiscardDetail[], allTiles: Hai[], setshowUkeireResult: (isShow: boolean) => void }

export default function UkeireResultView(props: TypeUkeireResult) {
    return (
        <div className={styles.ukeire_result_view}>
            <div className={styles.overlay}></div>
            <div className={styles.close_btn} onClick={() => props.setshowUkeireResult(false)}>
                <span></span><span></span>
            </div>
            <table className={`${styles.ukeire_result_table}`}>
                <thead>
                    <tr>
                        <th>打牌</th>
                        <th>向聴</th>
                        <th>受け入れ</th>
                        <th>有効牌</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ukeireDetails.map((discardDetail, index) => (
                        <tr key={index}>
                            <td><img className={styles.hai_image} src={"images/" + props.allTiles[discardDetail.haiId].imageUrl}></img></td>
                            <td>{discardDetail.shanten}</td>
                            <td>{discardDetail.ukeireCount}</td>
                            <td className={styles.td_yuukouhai}>
                            {discardDetail.ukeireDetails.map((ukeireDetail) => (
                                <div>
                                    <img className={styles.hai_image} src={"images/" + props.allTiles[ukeireDetail.hai].imageUrl}></img>
                                    <p>{ukeireDetail.count}</p>
                                </div>
                            ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}