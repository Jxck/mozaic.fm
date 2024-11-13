export type Props = JSX.IntrinsicElements["button"] & {
  valiant?: "primary" | "secondary";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Button({ type, children, valiant, ...rest }: Props) {
  return (
    <button type={type ?? "button"} {...rest}>
      {children}
    </button>
  );
}
