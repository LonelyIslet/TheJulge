export interface IColumn<T> {
  id: keyof T;
  label: string;
}

export interface EmployerPostData {
  id: number;
  name: string;
  intro: string;
  phoneNumber: string;
  state: JSX.Element;
}

export interface EmployeePostData {
  id: number;
  store: string;
  date: string;
  hourlyWage: number;
  state: JSX.Element;
}
