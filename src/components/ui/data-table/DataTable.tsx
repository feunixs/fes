
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  FileText,
  Printer,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Column = {
  header: string;
  accessorKey: string;
  cell?: (info: any) => React.ReactNode;
};

type DataTableProps = {
  data: any[];
  columns: Column[];
  title?: string;
  onAdd?: () => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onExport?: () => void;
  onPrint?: () => void;
};

const DataTable = ({
  data,
  columns,
  title,
  onAdd,
  onEdit,
  onDelete,
  onExport,
  onPrint,
}: DataTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter data based on search query
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;
    
    return Object.values(item).some(
      (val) => 
        val && 
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  return (
    <div className="bg-white rounded-md shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          
          <div className="flex flex-col md:flex-row gap-2 md:ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full md:w-[200px]"
              />
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            
            {onExport && (
              <Button variant="outline" size="icon" onClick={onExport}>
                <FileText className="h-4 w-4" />
              </Button>
            )}
            
            {onPrint && (
              <Button variant="outline" size="icon" onClick={onPrint}>
                <Printer className="h-4 w-4" />
              </Button>
            )}
            
            {onAdd && (
              <Button onClick={onAdd} className="bg-feunix-600 hover:bg-feunix-700">
                <Plus className="h-4 w-4 mr-2" /> Add New
              </Button>
            )}
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium mb-3">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="flex space-x-2">
                  <Input type="date" className="flex-1" />
                  <Input type="date" className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                    <SelectItem value="category3">Category 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-1 md:col-span-3 flex justify-end">
                <Button variant="outline" className="mr-2">Reset</Button>
                <Button className="bg-feunix-600 hover:bg-feunix-700">Apply Filters</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column.header}</TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.cell
                        ? column.cell(row[column.accessorKey])
                        : row[column.accessorKey]}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell>
                      <div className="flex space-x-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(row)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => onDelete(row)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="text-center py-6"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{" "}
            {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center mr-4">
            <span className="text-sm text-gray-500 mr-2">Items per page:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm">
            Page {currentPage} of {Math.max(1, totalPages)}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
