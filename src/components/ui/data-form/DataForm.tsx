
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type FormField = {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "select" | "textarea" | "date";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string | number;
};

type DataFormProps = {
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
  initialData?: Record<string, any>;
  requirePin?: boolean;
};

const DataForm = ({
  title,
  fields,
  onSubmit,
  onCancel,
  isLoading = false,
  submitText = "Submit",
  cancelText = "Cancel",
  initialData = {},
  requirePin = false,
}: DataFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    ...fields.reduce((acc, field) => {
      acc[field.name] = initialData[field.name] || field.defaultValue || "";
      return acc;
    }, {} as Record<string, any>),
  });
  
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (requirePin) {
      // In a real app, you would validate the PIN against the backend
      if (pin !== "1234") {
        setPinError("Invalid PIN. Please try again.");
        return;
      }
      setPinError("");
    }
    
    onSubmit(formData);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feunix-500 focus:border-feunix-500"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feunix-500 focus:border-feunix-500 min-h-[100px]"
                    required={field.required}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feunix-500 focus:border-feunix-500"
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          
          {requirePin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium mb-3">Confirmation</h3>
              <div className="space-y-2">
                <label htmlFor="pin" className="text-sm font-medium text-gray-700">
                  Enter PIN to confirm
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full md:w-[200px] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feunix-500 focus:border-feunix-500"
                  required
                  maxLength={6}
                />
                {pinError && <p className="text-sm text-red-500">{pinError}</p>}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2 border-t pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-feunix-600 hover:bg-feunix-700"
          >
            {isLoading ? "Processing..." : submitText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DataForm;
