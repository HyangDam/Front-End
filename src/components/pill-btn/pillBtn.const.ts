export type PillBtnVariant = "primary" | "rose" | "ghost" | "outline";

export const PILL_BTN_VARIANT_CLASSES: Record<PillBtnVariant, string> = {
  primary: "bg-sage text-white",
  rose: "bg-rose text-white",
  ghost: "bg-ivory-200 text-charcoal",
  outline: "border border-border-dark bg-transparent text-charcoal",
};
