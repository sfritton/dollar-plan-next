type LooseObject = Record<string, any>;

type AnyFunction<R = any> = (...args: any[]) => R;

type AtMinimum<T> = T & LooseObject;

type Dictionary<K, T> = Partial<Record<K, T>>;
