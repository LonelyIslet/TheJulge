export interface INoticesColumn<T> {
  id: keyof T;
  label: string;
}

export interface IEmployerNotices {
  id: string;
  name: string;
  intro: string;
  phoneNumber: string;
  state: JSX.Element;
}

export interface IEmployeeNotices {
  id: string;
  store: string;
  date: string;
  hourlyPay: number;
  state: JSX.Element;
}
