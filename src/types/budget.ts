export namespace Budget {
  export type Id = string | number;
  export interface Budget {
    month: number;
    year: number;
    id: Id;
  }

  export interface BudgetResponse extends Budget {
    incomeIds: Id[];
    expenseIds: Id[];
    groups: Record<string, GroupResponse>;
    categories: Record<string, CategoryResponse>;
    transactions: Record<string, Transaction>;
  }

  export interface GroupResponse extends Group {
    categoryIds: Id[];
  }

  export interface CategoryResponse extends Category {
    transactionIds: Id[];
  }

  export interface Group {
    id: Id;
    budget_id: Id;
    title: string;
    is_income: boolean;
    sort: number;
  }

  export interface Category {
    id: Id;
    group_id: Id;
    budget_id: Id;
    title: string;
    planned_amount: number;
    notes: string;
    sort: number;
  }

  export interface Transaction {
    id: Id;
    category_id: Id;
    group_id: Id;
    budget_id: Id;
    amount: number;
    date: number;
    description: string;
  }
}
