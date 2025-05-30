
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/data-table/DataTable";
import ActionButtons from "@/components/ui/action-buttons/ActionButtons";
import { useToast } from "@/components/ui/use-toast";
import { PurchaseOrder, PurchaseOrderItem, Supplier, Item } from "@/types/models";
import { formatCurrency, formatDate, getCurrentDate } from "@/lib/formatters";
import { validateForm, validationSchemas } from "@/lib/validators";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash } from "lucide-react";

// Mock data
const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2023-001",
    date: "2023-05-10",
    supplier: "PT. Steel Supplies",
    totalItems: 5,
    totalAmount: 12500000,
    status: "Pending",
    items: [],
  },
  {
    id: "PO-2023-002",
    date: "2023-05-15",
    supplier: "CV. Metal Works",
    totalItems: 3,
    totalAmount: 8750000,
    status: "Approved",
    items: [],
  },
  {
    id: "PO-2023-003",
    date: "2023-05-20",
    supplier: "PT. Hardware Solution",
    totalItems: 8,
    totalAmount: 15200000,
    status: "Delivered",
    items: [],
  },
  {
    id: "PO-2023-004",
    date: "2023-05-25",
    supplier: "PT. Tools & Equipment",
    totalItems: 2,
    totalAmount: 4300000,
    status: "Completed",
    items: [],
  },
  {
    id: "PO-2023-005",
    date: "2023-05-30",
    supplier: "CV. Industrial Supply",
    totalItems: 6,
    totalAmount: 9800000,
    status: "Cancelled",
    items: [],
  },
];

const mockSuppliers: Supplier[] = [
  { id: 1, name: "PT. Steel Supplies", address: "Jl. Baja No.1", phoneNumber: "021-1234567", email: "steel@supplies.com", contactPerson: "Budi", status: "Active" },
  { id: 2, name: "CV. Metal Works", address: "Jl. Besi No.2", phoneNumber: "021-2345678", email: "metal@works.com", contactPerson: "Andi", status: "Active" },
  { id: 3, name: "PT. Hardware Solution", address: "Jl. Perkakas No.3", phoneNumber: "021-3456789", email: "hardware@solution.com", contactPerson: "Siti", status: "Active" },
  { id: 4, name: "PT. Tools & Equipment", address: "Jl. Alat No.4", phoneNumber: "021-4567890", email: "tools@equipment.com", contactPerson: "Rina", status: "Active" },
  { id: 5, name: "CV. Industrial Supply", address: "Jl. Industri No.5", phoneNumber: "021-5678901", email: "industrial@supply.com", contactPerson: "Dewi", status: "Active" },
];

const mockItems: Item[] = [
  { id: 1, name: "Steel Pipe 2 inch", unit: "Meter", price: 120000 },
  { id: 2, name: "Aluminum Sheet 1mm", unit: "Sheet", price: 350000 },
  { id: 3, name: "Bolt 10mm", unit: "Box", price: 45000 },
  { id: 4, name: "Nut M10", unit: "Box", price: 35000 },
  { id: 5, name: "Metal Bracket", unit: "Piece", price: 75000 },
];

// Table columns
const columns = [
  { header: "PO Number", accessorKey: "id" },
  {
    header: "Date",
    accessorKey: "date",
    cell: (value: string) => formatDate(value, "dd/MM/yyyy"),
  },
  { header: "Supplier", accessorKey: "supplier" },
  { header: "Items", accessorKey: "totalItems" },
  {
    header: "Total Amount",
    accessorKey: "totalAmount",
    cell: (value: number) => formatCurrency(value),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (value: string) => {
      const statusColors: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-blue-100 text-blue-800",
        Delivered: "bg-purple-100 text-purple-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
      };
      
      return (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            statusColors[value] || "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      );
    },
  },
];

interface POFormData {
  supplier: string;
  date: string;
  notes: string;
}

const PurchaseOrdersPage = () => {
  const { toast } = useToast();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [poForm, setPOForm] = useState<POFormData>({
    supplier: "",
    date: getCurrentDate(),
    notes: "",
  });
  const [poItems, setPOItems] = useState<PurchaseOrderItem[]>([]);
  
  const handleAddNew = () => {
    setPOForm({
      supplier: "",
      date: getCurrentDate(),
      notes: "",
    });
    setPOItems([]);
    setIsFormOpen(true);
  };
  
  const handlePOFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setPOForm({ ...poForm, [name]: value });
  };
  
  const handleSupplierChange = (value: string) => {
    setPOForm({ ...poForm, supplier: value });
  };
  
  const handleAddItem = () => {
    setPOItems([
      ...poItems,
      { itemId: "", name: "", quantity: 1, price: 0 },
    ]);
  };
  
  const handleRemoveItem = (index: number) => {
    setPOItems(poItems.filter((_, i) => i !== index));
  };
  
  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ): void => {
    const updatedItems = [...poItems];
    
    if (field === "itemId" && typeof value === "string") {
      const selectedItem = mockItems.find((item) => item.id.toString() === value);
      if (selectedItem) {
        updatedItems[index] = {
          ...updatedItems[index],
          itemId: value,
          name: selectedItem.name,
          price: selectedItem.price,
        };
      }
    } else {
      updatedItems[index][field] = value;
    }
    
    setPOItems(updatedItems);
  };
  
  const calculateTotal = (): number => {
    return poItems.reduce((total, item) => {
      return total + (item.quantity || 0) * (item.price || 0);
    }, 0);
  };
  
  const handleSubmit = (): void => {
    // Validate form data
    if (!poForm.supplier) {
      toast({
        title: "Validation Error",
        description: "Please select a supplier",
        variant: "destructive",
      });
      return;
    }
    
    if (poItems.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one item",
        variant: "destructive",
      });
      return;
    }
    
    // Validate that all items have valid quantities
    const invalidItems = poItems.some(
      (item) => !item.itemId || !item.quantity || item.quantity <= 0
    );
    
    if (invalidItems) {
      toast({
        title: "Validation Error",
        description: "Please ensure all items have valid quantities and are properly selected.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // Generate a PO number
      const newPO: PurchaseOrder = {
        id: `PO-${new Date().getFullYear()}-${String(purchaseOrders.length + 1).padStart(3, "0")}`,
        date: poForm.date,
        supplier: mockSuppliers.find((s) => s.id.toString() === poForm.supplier)?.name || "",
        totalItems: poItems.length,
        totalAmount: calculateTotal(),
        status: "Pending",
        items: poItems,
      };
      
      // Update state
      setPurchaseOrders([...purchaseOrders, newPO]);
      
      // Close dialog and show toast
      setIsFormOpen(false);
      toast({
        title: "Purchase Order Created",
        description: `Purchase Order ${newPO.id} has been created successfully.`,
      });
    }, 1000);
  };
  
  const handleExport = (): void => {
    toast({
      title: "Export Started",
      description: "Your data is being exported...",
    });
    // Implementation would go here
  };
  
  const handlePrint = (): void => {
    toast({
      title: "Print Started",
      description: "Preparing document for printing...",
    });
    // Implementation would go here
  };
  
  return (
    <DashboardLayout
      title="Purchase Orders"
      breadcrumbs={[
        { title: "Dashboard", path: "/dashboard" },
        { title: "Purchased", path: "#" },
        { title: "Purchase Orders", path: "/purchased/orders" },
      ]}
    >
      <div className="mb-6">
        <ActionButtons
          onAdd={handleAddNew}
          onExport={handleExport}
          onPrint={handlePrint}
        />
      </div>
      
      <DataTable
        data={purchaseOrders}
        columns={columns}
        onAdd={handleAddNew}
        onExport={handleExport}
        onPrint={handlePrint}
        title="Purchase Order List"
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Purchase Order</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select
                  value={poForm.supplier}
                  onValueChange={handleSupplierChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSuppliers.map((supplier) => (
                      <SelectItem
                        key={supplier.id}
                        value={supplier.id.toString()}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  name="date"
                  value={poForm.date}
                  onChange={handlePOFormChange}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Notes</Label>
                <textarea
                  name="notes"
                  value={poForm.notes}
                  onChange={handlePOFormChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feunix-500 focus:border-feunix-500 min-h-[100px]"
                  placeholder="Additional notes or instructions"
                ></textarea>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Order Items</h3>
                <Button
                  type="button"
                  onClick={handleAddItem}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Item
                </Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {poItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No items added yet. Click "Add Item" to add items to
                          this purchase order.
                        </TableCell>
                      </TableRow>
                    ) : (
                      poItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Select
                              value={item.itemId}
                              onValueChange={(value) =>
                                handleItemChange(index, "itemId", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select an item" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockItems.map((mockItem) => (
                                  <SelectItem
                                    key={mockItem.id}
                                    value={mockItem.id.toString()}
                                  >
                                    {mockItem.name} ({mockItem.unit})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "quantity",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            {formatCurrency(item.price)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency((item.price || 0) * (item.quantity || 0))}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                    
                    {poItems.length > 0 && (
                      <TableRow className="bg-gray-50">
                        <TableCell
                          colSpan={3}
                          className="text-right font-medium"
                        >
                          Grand Total
                        </TableCell>
                        <TableCell className="font-bold">
                          {formatCurrency(calculateTotal())}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-feunix-600 hover:bg-feunix-700">
                Create Purchase Order
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PurchaseOrdersPage;
