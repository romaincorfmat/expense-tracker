import ExpenseForm from "@/components/ExpenseForm";
import ExpensesList from "@/components/ExpensesList";
import ExpenseStat from "@/components/ExpenseStat";
import Modal from "@/components/Modal";
import ModalTrigger from "@/components/ModalTrigger";
import Search from "@/components/Search/Search";

export default async function ExpensesPage({ searchParams }: RouteParams) {
  const { name, transactionType } = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="flex flex-col min-h-screen gap-4 w-full max-w-md md:max-w-2xl bg-white shadow-md p-4 ">
        <h1 className="text-center text-3xl mb-4">Latest Expenses</h1>
        <ExpenseStat />
        <div className="flex w-full justify-start">
          <ModalTrigger
            title={"Add New Transaction"}
            modalContent={<ExpenseForm />}
          />
        </div>
        <Search />

        <ExpensesList name={name} transactionType={transactionType} />
        <Modal />
      </div>
    </div>
  );
}
