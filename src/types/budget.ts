export namespace Budget {
  export interface Budget {
    month: number;
    year: number;
    id: number;
  }

  export interface BudgetResponse extends Budget {
    incomeIds: number[];
    expenseIds: number[];
    groups: Record<string, GroupResponse>;
    categories: Record<string, CategoryResponse>;
    transactions: Record<string, Transaction>;
  }

  export interface GroupResponse extends Group {
    categoryIds: number[];
  }

  export interface CategoryResponse extends Category {
    transactionIds: number[];
  }

  export interface Group {
    id: number;
    budget_id: number;
    title: string;
    is_income: boolean;
    sort: number;
  }

  export interface Category {
    id: number;
    group_id: number;
    budget_id: number;
    title: string;
    planned_amount: number;
    notes: string;
    sort: number;
  }

  export interface Transaction {
    id: number;
    category_id: number;
    group_id: number;
    budget_id: number;
    amount: number;
    date: number;
    description: string;
  }
}
