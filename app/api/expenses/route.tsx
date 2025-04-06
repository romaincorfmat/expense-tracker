import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    expenses,
    success: true,
  });
}

export async function POST(request: Request) {
  const { name, amount, category, date } = await request.json();

  try {
    const expense = await prisma.expense.create({
      data: {
        name,
        amount,
        category,
        date: new Date(date).toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
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
