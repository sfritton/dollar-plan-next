export namespace BudgetLegacy {
  export interface Budget {
    date: DateClass;
    categoryGroups: Record<string, CategoryGroup>;
  }

  export interface CategoryGroup {
    title: string;
    categories: Record<string, Category>;
  }

  export interface Category {
    title: string;
    plannedAmount: number;
    transactions: Transaction[];
    notes?: string;
  }

  export interface Transaction {
    id: number;
    amount: number;
    date: number;
    description: string;
  }

  export interface DateClass {
    month: number;
    year: number;
  }
}
