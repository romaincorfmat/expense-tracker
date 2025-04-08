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
import { Category, TransactionType } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  amount: z.coerce
    .number()
    .min(0.01, { message: "The value must be greater than 0" }),
  category: z.nativeEnum(Category),
  transactionType: z.nativeEnum(TransactionType),
});

const ExpenseForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.OTHER
  );
  const [selectedTranscationType, setSelectedTranscationType] =
    useState<TransactionType>(TransactionType.EXPENSE);

  const { mutate, error } = useCreateExpense();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: undefined,
      category: Category.OTHER,
      transactionType: TransactionType.EXPENSE,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        toast.success("Expense created successfully");
        form.reset();
        setSelectedCategory(Category.OTHER);
        setSelectedTranscationType(TransactionType.EXPENSE);
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
        className="space-y-8 min-w-md w-full mx-auto border border-gray-300 rounded-lg p-4 shadow-md"
      >
        <h1 className="text-xl text-center text-emerald-400 font-semibold">
          Add an expense
        </h1>
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

        <div className="flex gap-4 w-full items-center ">
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

          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {selectedTranscationType || "Select transaction type"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          field.onChange(TransactionType.EXPENSE);
                          setSelectedTranscationType("EXPENSE");
                        }}
                      >
                        EXPENSE
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          field.onChange(TransactionType.INCOME);
                          setSelectedTranscationType("INCOME");
                        }}
                      >
                        INCOME
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
