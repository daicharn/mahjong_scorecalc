import { BlockHais, BlockHaisList, Hai } from "mahjong_engine";
import { blockRes } from "./TypeDefs";

export class CommonUtils{
    static blockEquals(a: BlockHais, b: BlockHais): boolean{
        const aHaiNums = a.getHais().map(h => h.getId());
        const bHaiNums = b.getHais().map(h => h.getId());
        const isSameType = a.getType() === b.getType();
        const isSameNums = JSON.stringify(aHaiNums) === JSON.stringify(bHaiNums)

        return isSameType && isSameNums;
    }

    static toBlockHaisList(blockObj: blockRes): BlockHaisList{
      const list = new BlockHaisList();
      blockObj.blocks.forEach(block => {
        const hais = block.hais.map(h => new Hai(h.id));
        const type = block.type;
        list.push(new BlockHais(hais, type));
      });
    
      return list;
    }
}