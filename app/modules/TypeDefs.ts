import { BlockType, MeldType } from 'mahjong_engine';

export type fuDetailObj = {
  name: string,
  fu: number,
  mentsuType?: BlockType | MeldType,
  minHaiId?: number
}

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
  fuDetail: fuDetailObj[]
}

type blockRes = {
  blocks: {
    type: string,
    hais: {
      id: number
    }[]
  }[]
}

export enum Mode {
  Normal = "normal",
  Naki = "naki",
  Agari = "agari"
};

export type resType = {blockObj: blockRes, yakuMapObj: Record<string, number>, scoreResultObj: scoreRes};
export type NakiKey = "none" | "chi" | "pon" | "minkan" | "ankan";
export type NakiMode = Record<NakiKey, boolean>;

export type Radio = {label: string, value: string, disable: boolean};

export type Settings = {
  agari: string,
  riichi: string,
  ippatsu: string,
  playerwind: string,
  roundwind: string,
  other: string,
  dora: number
}

export enum AgariVal {
  Tsumo = "tsumo",
  Ron = "ron"
}

export enum RiichiVal {
  None = "none",
  Riichi = "riichi",
  Daburii = "daburii"
}

export enum WindVal {
  EAST = "east",
  SOUTH = "south",
  WEST = "west",
  NORTH = "north"
}

export enum BoolVal {
  True = "true",
  False = "false"
}

export enum OtherVal {
  None = "none_other",
  Tenho = "tenho",
  Chiho = "chiho",
  Rinshan = "rinshan",
  chankan = "chankan",
  haitei = "haitei",
  houtei = "houtei"
}