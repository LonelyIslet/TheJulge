'use client'

import useAppSelector from "redux/hooks/useAppSelector";

const TonyPage = () => {
  const user = useAppSelector(state => state.user)
  return (
    <div/>
  )
};

export default TonyPage;
