
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@moveinsync.com"), {
      message: "Email must end with @moveinsync.com",
    }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  department: z.enum([
    "Product management", 
    "Sales", 
    "Design", 
    "Marketing", 
    "Coder", 
    "Operations"
  ]),
});

const LoginPage = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "details">("email");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      department: "Product management",
    },
  });

  const handleEmailSubmit = (data: { email: string }) => {
    // Extract name from email (first-name.last-name@moveinsync.com format)
    const emailParts = data.email.split("@")[0].split(".");
    let prefillName = "";
    
    if (emailParts.length >= 2) {
      prefillName = emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1) + " " + 
                    emailParts[1].charAt(0).toUpperCase() + emailParts[1].slice(1);
    }
    
    form.setValue("name", prefillName);
    setStep("details");
  };

  const handleDetailsSubmit = (values: z.infer<typeof formSchema>) => {
    login(values.email, values.name, values.department);
    toast({
      title: "Login successful",
      description: "Welcome to SwipeCheck!",
    });
    // Redirect to homepage instead of dashboard
    navigate("/");
  };

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Welcome to SwipeCheck</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {step === "email" ? (
              <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.name@moveinsync.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Continue</Button>
              </form>
            ) : (
              <form onSubmit={form.handleSubmit(handleDetailsSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Product management">Product Management</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Coder">Coder</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep("email")} className="w-1/2">
                    Back
                  </Button>
                  <Button type="submit" className="w-1/2">
                    Login
                  </Button>
                </div>
              </form>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
