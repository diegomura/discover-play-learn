function Button({ children, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      className="rounded-md bg-neutral-200 px-5 font-semibold text-black transition-colors hover:bg-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
