enum Category {
  FOOD = Category.FOOD,
  TRANSPORT = Category.TRANSPORT,
  ENTERTAINMENT = Category.ENTERTAINMENT,
  HEALTH = Category.HEALTH,
  UTILITIES = Category.UTILITIES,
  OTHER = Category.OTHER,
  //   EDUCATION = "Education",
  //   SHOPPING = "Shopping",
  //   TRAVEL = "Travel",
  //   INSURANCE = "Insurance",
  //   MISC = "Miscellaneous",
  //   SUBSCRIPTION = "Subscription",
}

interface Expense {
  id?: number;
  name: string;
  amount: number;
  category: Category;
  date: string;
}
