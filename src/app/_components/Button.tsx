export type Props = JSX.IntrinsicElements["button"] & {
  valiant?: "primary" | "secondary";
};

export function Button({ type, children, valiant, ...rest }: Props) {
  return (
    <button type={type ?? "button"} {...rest}>
      {children}
    </button>
  );
}
