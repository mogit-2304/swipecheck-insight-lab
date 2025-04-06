
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const departments = ["Product management", "Sales", "Design", "Marketing", "Coder", "Operations"];

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().max(100, {
    message: "Description must not exceed 100 words",
  }),
  visibility: z.enum(["public", "private"]),
  allowedDepartments: z.array(z.string()).optional(),
});

interface CreateProjectFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const CreateProjectForm = ({ onSubmit }: CreateProjectFormProps) => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "public",
      allowedDepartments: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    // Count words in description
    const wordCount = values.description.trim().split(/\s+/).length;
    
    if (wordCount > 100) {
      toast({
        title: "Description too long",
        description: "Description must not exceed 100 words",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...values,
      // Include image data in the submission
      ...(imagePreview && { imageUrl: imagePreview }),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (max 100 words)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter project description" 
                  {...field} 
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <FormLabel htmlFor="image-upload">Upload Image</FormLabel>
          <Input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="mt-1"
          />
          
          {imagePreview && (
            <div className="mt-2">
              <Card className="overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover" 
                />
              </Card>
            </div>
          )}
        </div>
        
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public (All users)</SelectItem>
                  <SelectItem value="private">Private (Selected departments)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {form.watch("visibility") === "private" && (
          <div className="space-y-2">
            <FormLabel>Allowed Departments</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {departments.map((dept) => (
                <div key={dept} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`dept-${dept}`}
                    value={dept}
                    onChange={(e) => {
                      const currentDepts = form.getValues("allowedDepartments") || [];
                      if (e.target.checked) {
                        form.setValue("allowedDepartments", [...currentDepts, dept]);
                      } else {
                        form.setValue("allowedDepartments", 
                          currentDepts.filter(d => d !== dept)
                        );
                      }
                    }}
                    className="h-4 w-4"
                  />
                  <label htmlFor={`dept-${dept}`}>{dept}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Button type="submit" className="w-full">
          Create Project
        </Button>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
