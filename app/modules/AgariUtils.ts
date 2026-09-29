import { BlockHais, BlockHaisList, BlockType, MachiType } from "mahjong_engine";
import { fuDetailObj } from "./TypeDefs";
import { MachiUtils } from "./MachiUtils";
import { CommonUtils } from "./CommonUtils";

export class AgariUtils{
    static calcNormalAgariIndex(
        blocks: BlockHaisList,
        machiTypesBase: Map<MachiType, BlockHais>, 
        fuDetail: fuDetailObj[], agariHaiId: number
    ): number[] | null  {
        const fuTypes: MachiType[] = [MachiType.KANCHAN, MachiType.PENCHAN, MachiType.TANKI];
        
        const detail = fuDetail.find(detail => detail.machiType !== undefined);
        const detailType = detail?.machiType;
        
        const fuMachi = detailType !== undefined 
            ? [...machiTypesBase.entries()].find(([MachiType]) => MachiType === detailType) 
            : undefined;
        const nonFuMachi = [...machiTypesBase.entries()]
            .find(([machiType]) => !fuTypes.includes(machiType));

        const machi = detailType !== undefined ? fuMachi : nonFuMachi;
        if(!machi) return null;

        const [machiType, blockHais] = machi;

        const blockIndex = blocks.getBlockHais().findIndex(block => CommonUtils.blockEquals(block, blockHais));
        const machiIndex = MachiUtils.calcMachiIndex(blockHais.getHais(), machiType, agariHaiId);

        return [blockIndex, machiIndex];
    }

    static calcChitoiAgariIndex(blocks: BlockHaisList, agariHaiId: number): number[] | null {
        const blockIndex = blocks.getBlockHais()
            .findIndex(block => block.getType() === BlockType.CHITOI && block.minHai.getId() === agariHaiId);
        if(blockIndex === -1) return null;

        return [blockIndex, 0];
    }

    static calcKokushiAgariIndex(blocks: BlockHaisList, agariHaiId: number): number[] | null {
    const blockKokushi = blocks.getBlockHais().find(block => block.getType() === BlockType.KOKUSHI);
    if(blockKokushi === undefined) return null;
    const machiIndex = blockKokushi.getHais().findIndex(h => h.getId() === agariHaiId);
    if(machiIndex === -1) return null;

    return [0, machiIndex];
    }

    static calcAgariIndex(blocks: BlockHaisList,
        machiTypesBase: Map<MachiType, BlockHais>, 
        fuDetail: fuDetailObj[], agariHaiId: number
    ) : number[] {
        const normalAgariIndex = AgariUtils.calcNormalAgariIndex(blocks, machiTypesBase, fuDetail, agariHaiId);
        const chitoiAgariIndex = AgariUtils.calcChitoiAgariIndex(blocks, agariHaiId);
        const KokushiAgariIndex = AgariUtils.calcKokushiAgariIndex(blocks, agariHaiId);
        const agariIndexes = [normalAgariIndex, chitoiAgariIndex, KokushiAgariIndex];
        const agariIndex = agariIndexes.find(agariIndex => agariIndex !== null);
        if(agariIndex !== undefined) return agariIndex;
        else return [-1, -1];
    }
}