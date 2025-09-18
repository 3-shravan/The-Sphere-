export default function H2({ text, children }) {
  return (
    <h2
      className={`text-3xl md:font-bold md:leading-tight md:tracking-tighter font-Futura font-bold text-left w-full
        ${
          children &&
          " text-lg w-full font-extralight font-Gilroy px-1 text-muted-foreground "
        }
        `}
    >
      {text}
      {children}
    </h2>
  );
}
