
export type ThreatCode = "green" | "orange" | "red" | "black";

export interface ThreatLevel {
  id?: string;
  threat_code: ThreatCode;
  message?: string;
  updated_at?: string;
}

export interface ThreatLevelInfo {
  code: ThreatCode;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export const threatLevelsInfo: Record<ThreatCode, ThreatLevelInfo> = {
  green: {
    code: "green",
    name: "Kod Zielony",
    description: "Brak zagrożenia",
    color: "#4ade80",
    bgColor: "#F2FCE2",
    textColor: "#166534",
  },
  orange: {
    code: "orange",
    name: "Kod Pomarańczowy",
    description: "Zamieszki w mieście, ograniczona współpraca z LSPD",
    color: "#fb923c",
    bgColor: "#FEC6A1",
    textColor: "#9a3412",
  },
  red: {
    code: "red",
    name: "Kod Czerwony",
    description: "Zagrożenie terrorystyczne",
    color: "#ea384c",
    bgColor: "#fecdd3",
    textColor: "#be123c",
  },
  black: {
    code: "black",
    name: "Kod Czarny",
    description: "Wysoki poziom zagrożenia terrorystycznego",
    color: "#000000e6",
    bgColor: "#d4d4d8",
    textColor: "#18181b",
  },
};
