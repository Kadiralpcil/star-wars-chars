interface TableBodyProps<T> {
  columns: { header: string; key: keyof T }[];
  data: T[];
  navigate: (url: string) => void;
}

const TableBody = <T extends { id: string; name?: string | null }>({
  columns,
  data,
  navigate,
}: TableBodyProps<T>) => {
  return (
    <div className="custom-table-body">
      {data.map((row) => (
        <div
          key={row.id}
          className="custom-table-body-row"
          onClick={() => navigate(`/detail?id=${row.id}`)}
        >
          {columns.map((col) => (
            <div key={col.key as string} className="custom-table-cell">
              {String(row[col.key])}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBody;
