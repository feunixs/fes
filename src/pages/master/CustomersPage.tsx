
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/data-table/DataTable";
import DataForm from "@/components/ui/data-form/DataForm";
import ActionButtons from "@/components/ui/action-buttons/ActionButtons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    name: "PT. Global Solutions",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    phoneNumber: "021-5551234",
    email: "contact@globalsolutions.co.id",
    contactPerson: "Budi Santoso",
    status: "Active",
  },
  {
    id: 2,
    name: "CV. Maju Bersama",
    address: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
    phoneNumber: "021-5557890",
    email: "info@majubersama.com",
    contactPerson: "Siti Rahma",
    status: "Active",
  },
  {
    id: 3,
    name: "PT. Teknologi Terdepan",
    address: "Jl. Kuningan No. 78, Jakarta Selatan",
    phoneNumber: "021-5559876",
    email: "support@teknoterdepan.com",
    contactPerson: "Agus Wijaya",
    status: "Inactive",
  },
  {
    id: 4,
    name: "PT. Sukses Makmur",
    address: "Jl. Thamrin No. 90, Jakarta Pusat",
    phoneNumber: "021-5552345",
    email: "info@suksesmakmur.com",
    contactPerson: "Dewi Lestari",
    status: "Active",
  },
  {
    id: 5,
    name: "CV. Abadi Jaya",
    address: "Jl. Hayam Wuruk No. 112, Jakarta Barat",
    phoneNumber: "021-5554567",
    email: "contact@abadijaya.com",
    contactPerson: "Eko Prasetyo",
    status: "Active",
  },
];

// Table columns definition
const columns = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Address", accessorKey: "address" },
  { header: "Phone", accessorKey: "phoneNumber" },
  { header: "Email", accessorKey: "email" },
  { header: "Contact Person", accessorKey: "contactPerson" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (value: string) => (
      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
          value === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {value}
      </span>
    ),
  },
];

// Form fields definition
const formFields = [
  {
    name: "name",
    label: "Company Name",
    type: "text" as const,
    placeholder: "Enter company name",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    type: "textarea" as const,
    placeholder: "Enter address",
    required: true,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text" as const,
    placeholder: "Enter phone number",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    placeholder: "Enter email address",
    required: true,
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    type: "text" as const,
    placeholder: "Enter contact person name",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select" as const,
    required: true,
    options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
    ],
  },
];

const CustomersPage = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState(mockCustomers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddNew = () => {
    setSelectedCustomer(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };
  
  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditing(true);
    setIsFormOpen(true);
  };
  
  const handleDelete = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Customer Deleted",
      description: `${selectedCustomer.name} has been deleted successfully.`,
    });
  };
  
  const handleSubmit = (data: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isEditing) {
        setCustomers(
          customers.map((c) =>
            c.id === selectedCustomer.id ? { ...data, id: selectedCustomer.id } : c
          )
        );
        toast({
          title: "Customer Updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        const newId = Math.max(...customers.map((c) => c.id)) + 1;
        setCustomers([...customers, { ...data, id: newId }]);
        toast({
          title: "Customer Added",
          description: `${data.name} has been added successfully.`,
        });
      }
      
      setIsLoading(false);
      setIsFormOpen(false);
    }, 1000);
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Customer data is being exported to Excel.",
    });
  };
  
  const handlePrint = () => {
    toast({
      title: "Print Initiated",
      description: "Customer data report is being prepared for printing.",
    });
  };
  
  return (
    <DashboardLayout
      title="Customer Data"
      breadcrumbs={[
        { title: "Dashboard", path: "/dashboard" },
        { title: "Master Data", path: "#" },
        { title: "Customer Data", path: "/master/customers" },
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
        data={customers}
        columns={columns}
        onAdd={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
        onPrint={handlePrint}
        title="Customer List"
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          </DialogHeader>
          <DataForm
            title=""
            fields={formFields}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            isLoading={isLoading}
            submitText={isEditing ? "Update" : "Save"}
            initialData={selectedCustomer}
            requirePin={true}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedCustomer?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default CustomersPage;
