"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useCreateExpense } from "@/hooks/useCreateExpense";
import { toast } from "sonner";
import { Category } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  amount: z.coerce
    .number()
    .min(0.01, { message: "The value must be greater than 0" }),
  category: z.nativeEnum(Category),
});

const ExpenseForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.OTHER
  );

  const { mutate, error } = useCreateExpense();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: undefined,
      category: Category.OTHER,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        toast("Expense created successfully");
        form.reset();
        setSelectedCategory(Category.FOOD);
      },
      onError: (error) => {
        console.error("Error creating expense:", (error as Error).message);
      },
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-lg mx-auto mt-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Amount"
                  step="0.01"
                  min="0"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {selectedCategory || "Select category"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        field.onChange(Category.FOOD);
                        setSelectedCategory("FOOD");
                      }}
                    >
                      Food
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        field.onChange(Category.TRANSPORT);
                        setSelectedCategory("TRANSPORT");
                      }}
                    >
                      Transport
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        field.onChange(Category.ENTERTAINMENT);
                        setSelectedCategory("ENTERTAINMENT");
                      }}
                    >
                      Entertainment
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        field.onChange(Category.HEALTH);
                        setSelectedCategory("HEALTH");
                      }}
                    >
                      Health
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        field.onChange(Category.UTILITIES);
                        setSelectedCategory("UTILITIES");
                      }}
                    >
                      Utilities
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        field.onChange(Category.OTHER);
                        setSelectedCategory("OTHER");
                      }}
                    >
                      Other
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {/* {isLoading ? "Saving..." : "Create Expense"} */}
          Submit
        </Button>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    </Form>
  );
};

export default ExpenseForm;
