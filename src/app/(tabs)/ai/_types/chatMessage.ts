export type ChatMessageRoleT = "ai" | "user";

export type ChatMessageT = {
  role: ChatMessageRoleT;
  text: string;
  perfumeIds?: number[];
  note?: string;
};
