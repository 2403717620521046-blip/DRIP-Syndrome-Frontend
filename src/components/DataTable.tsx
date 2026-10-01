import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Download,
  Filter,
  Eye,
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';
import { DatasetColumn } from '../types';

interface DataTableProps {
  columns: DatasetColumn[];
  rows: Record<string, any>[];
  totalRows?: number;
  pageSize?: number;
  onDownload?: () => void;
  datasetName?: string;
  loading?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  totalRows,
  pageSize: initialPageSize = 10,
  onDownload,
  datasetName = "financial_dataset.csv",
  loading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(c => c.name)
  );
  const [showColumnPicker, setShowColumnPicker] = useState(false);

  // Sync visible columns when columns prop changes
  React.useEffect(() => {
    setVisibleColumns(columns.map(c => c.name));
  }, [columns]);

  // Handle Sort
  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Filter and sort rows client-side if data is passed
  const filteredAndSortedRows = useMemo(() => {
    let result = [...rows];

    // Filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(row =>
        Object.entries(row).some(([col, val]) =>
          visibleColumns.includes(col) && String(val).toLowerCase().includes(q)
        )
      );
    }

    // Sort
    if (sortColumn) {
      result.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        return sortDirection === 'asc'
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      });
    }

    return result;
  }, [rows, searchTerm, sortColumn, sortDirection, visibleColumns]);

  // Pagination calculation
  const totalCount = totalRows || filteredAndSortedRows.length;
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedRows.length / pageSize));
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedRows.slice(start, start + pageSize);
  }, [filteredAndSortedRows, currentPage, pageSize]);

  // Handle CSV Download
  const handleExportCSV = () => {
    if (onDownload) {
      onDownload();
      return;
    }
    // Default CSV client export
    const headers = visibleColumns.join(',');
    const csvContent = filteredAndSortedRows
      .map(row => visibleColumns.map(col => `"${row[col] ?? ''}"`).join(','))
      .join('\n');
    const blob = new Blob([`${headers}\n${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', datasetName.endsWith('.csv') ? datasetName : `${datasetName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleColumn = (colName: string) => {
    if (visibleColumns.includes(colName)) {
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter(c => c !== colName));
      }
    } else {
      setVisibleColumns([...visibleColumns, colName]);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl shadow-card overflow-hidden">
      {/* Top Controls Bar */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search across all fields..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-white text-xs text-slate-800 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Action Buttons: Column Visibility & Export */}
        <div className="flex items-center gap-2">
          {/* Column Toggle Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowColumnPicker(!showColumnPicker)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              Columns ({visibleColumns.length}/{columns.length})
            </button>

            {showColumnPicker && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-30 p-2 text-xs">
                <div className="px-2 py-1.5 font-semibold text-slate-700 border-b border-slate-100 flex items-center justify-between">
                  <span>Toggle Columns</span>
                  <button
                    onClick={() => setVisibleColumns(columns.map(c => c.name))}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    Reset All
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto mt-1 space-y-1">
                  {columns.map(col => (
                    <label
                      key={col.name}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-50 cursor-pointer text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(col.name)}
                        onChange={() => toggleColumn(col.name)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <span className="truncate">{col.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Download Dataset */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download Dataset
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-semibold tracking-wider">
              {columns
                .filter(col => visibleColumns.includes(col.name))
                .map(col => {
                  const isSorted = sortColumn === col.name;
                  return (
                    <th
                      key={col.name}
                      onClick={() => handleSort(col.name)}
                      className="py-3 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors select-none whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{col.name}</span>
                        {isSorted ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60 hover:opacity-100" />
                        )}
                        <span className="text-[10px] lowercase text-slate-400 font-mono">
                          [{col.type.slice(0, 3)}]
                        </span>
                      </div>
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className="py-12 text-center text-slate-400"
                >
                  <p className="text-sm font-medium">No matching records found.</p>
                  <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria.</p>
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50/30 transition-colors even:bg-slate-50/40"
                >
                  {columns
                    .filter(col => visibleColumns.includes(col.name))
                    .map(col => {
                      const val = row[col.name];
                      const isNull = val === null || val === undefined || val === '';
                      return (
                        <td
                          key={col.name}
                          className="py-2.5 px-4 text-slate-700 whitespace-nowrap font-mono text-[11px]"
                        >
                          {isNull ? (
                            <span className="italic text-slate-300">null</span>
                          ) : typeof val === 'number' ? (
                            val.toLocaleString()
                          ) : (
                            String(val)
                          )}
                        </td>
                      );
                    })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 border-t border-slate-200/80 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span>
            Showing <strong className="text-slate-800">{paginatedRows.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> to{' '}
            <strong className="text-slate-800">
              {Math.min(currentPage * pageSize, filteredAndSortedRows.length)}
            </strong>{' '}
            of <strong className="text-slate-800">{filteredAndSortedRows.length.toLocaleString()}</strong> filtered rows
            {filteredAndSortedRows.length !== rows.length && ` (total ${rows.length.toLocaleString()})`}
          </span>

          <div className="flex items-center gap-1.5 ml-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-700 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Page Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600"
            title="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2.5 py-1 font-medium text-slate-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600"
            title="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
