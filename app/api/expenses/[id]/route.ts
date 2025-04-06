import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const expenseId = (await params).id;

  if (!expenseId) {
    return NextResponse.json(
      {
        success: false,
        message: "Expense not Found",
      },
      { status: 404 }
    );
  }
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(expenseId),
      },
    });

    if (!expense) {
      return NextResponse.json(
        {
          success: false,
          message: "Expense not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: expense,
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const expenseId = (await params).id;
  if (!expenseId) {
    return NextResponse.json(
      {
        success: false,
        message: "Expense not Found",
      },
      { status: 404 }
    );
  }

  try {
    const expense = await prisma.expense.delete({
      where: {
        id: Number(expenseId),
      },
    });

    if (!expense) {
      return NextResponse.json(
        {
          success: false,
          message: "Expense not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Expense deleted successfully",
      },
      { status: 200 }
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
