import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(JSON.parse(JSON.stringify(expenses))); // Return array directly
}

export async function POST(request: Request) {
  const { name, amount, category } = await request.json();

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
