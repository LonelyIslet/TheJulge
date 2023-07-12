export interface IPostsColumn<T> {
  id: keyof T;
  label: string;
}

export interface IEmployerPosts {
  id: number;
  name: string;
  intro: string;
  phoneNumber: string;
  state: JSX.Element;
}

export interface IEmployeePosts {
  id: number;
  store: string;
  date: string;
  hourlyWage: number;
  state: JSX.Element;
}
