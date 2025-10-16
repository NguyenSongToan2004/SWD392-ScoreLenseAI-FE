export const ModeEnum = {
    EIGHTBALL: "2",
    NINEBALL: "3",
    ONECUSHION: "5",
    THREECUSHION: "6"
} as const;

export const ModeDisplayMap: Record<number, string> = {
  1 :"9 ball pool",
  2: "8 ball pool",
  3: "One-Cushion Carom",
};

export type ModeEnumType = typeof ModeEnum[keyof typeof ModeEnum];