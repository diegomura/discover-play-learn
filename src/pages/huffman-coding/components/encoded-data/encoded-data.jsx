function EncodedData({ data = [], onHover }) {
  return (
    <p className="w-full break-words text-justify">
      {data.map((entry, i) => {
        return (
          <span
            key={i}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            className="cursor-default rounded transition-colors hover:bg-neutral-300"
          >
            {entry}{' '}
          </span>
        );
      })}
    </p>
  );
}

export default EncodedData;
