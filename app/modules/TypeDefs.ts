import { BlockHaisList } from 'mahjong_engine/dist/BlockHaisList';

type scoreRes = {
    han: number,
    fuBasic: number,
    fuCeiled: number,
    tensuu: {
      ronOya: number,
      ronKo: number,
      tsumoOya: number,
      tsumoKo: {
        oya: number,
        ko: number
      }
    },
    fuDetail: {
      name: string,
      fu: number,
      mentsuType?: number,
      minHaiId?: number
    }[]
}

export enum Mode {
  Normal = "normal",
  Naki = "naki",
  Agari = "agari"
};

export type resType = {blockObj: BlockHaisList, yakuMapObj: Record<string, number>, scoreResultObj: scoreRes};
export type NakiKey = "none" | "chi" | "pon" | "minkan" | "ankan";
export type NakiMode = Record<NakiKey, boolean>;