function HuffmanTable({ rows, onRowHover }) {
  return (
    <table className="w-full">
      {rows?.map(({ label, path }) => (
        <tr
          key={label}
          onMouseEnter={() => onRowHover({ label, path })}
          onMouseLeave={() => onRowHover(null)}
          className="w-full border-b transition-colors hover:bg-slate-100"
        >
          <td className="w-1/2 px-2">{label}</td>
          <td className="w-1/2 px-2 font-medium">{path}</td>
        </tr>
      ))}
    </table>
  );
}

export default HuffmanTable;
