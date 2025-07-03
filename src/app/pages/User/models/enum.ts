export const ModeEnum = {
    EIGHTBALL: "2",
    NINEBALL: "3",
    ONECUSHION: "5",
    THREECUSHION: "6"
} as const;

export const ModeDisplayMap: Record<number, string> = {
  2: "8 ball pool",
  3: "9 ball pool",
  5: "One-Cushion Carom",
  6: "Three-Cushion Carom"
};

export type ModeEnumType = typeof ModeEnum[keyof typeof ModeEnum];