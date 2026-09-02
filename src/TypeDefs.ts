import {YakuContext} from 'mahjong_engine';

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

export type resType = {contextMax: YakuContext, yakuMapObj: Record<string, number>, scoreResultObj: scoreRes};