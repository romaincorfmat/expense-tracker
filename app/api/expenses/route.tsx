import { prisma } from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";
  const transactionType = searchParams.get("transactionType") || "";

  const expenses = await prisma.expense.findMany({
    where: {
      ...(name && {
        name: {
          contains: name,
        },
      }),
      ...(transactionType && {
        transactionType: {
          equals: transactionType as TransactionType, // Cast to the expected enum type
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(JSON.parse(JSON.stringify(expenses))); // Return array directly
}

export async function POST(request: Request) {
  const { name, amount, category, transactionType } = await request.json();

  if (!name || !amount || !category) {
    return NextResponse.json(
      { success: false, message: "All fields are required!" },
      { status: 400 }
    );
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        name,
        amount: parseFloat(amount),
        category,
        transactionType,
        date: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Expense created successfully",
        expense,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
