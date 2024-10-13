import { useNavigate } from "react-router-dom";

interface TableBodyProps<T> {
  columns: { header: string; key: keyof T }[];
  data: T[];
}

const TableBody = <T extends { id: string; name?: string | null }>({
  columns,
  data,
}: TableBodyProps<T>) => {
  const navigate = useNavigate();

  return (
    <div className="custom-table-body">
      {data.map((row) => (
        <div
          onClick={() => navigate(`/detail?id=${row.id}`)}
          key={row.id}
          className="custom-table-body-row"
        >
          {columns.map((col) => (
            <div key={col.key as string} className="custom-table-cell">
              {row[col.key] == null ? <div>-</div> : String(row[col.key])}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBody;
