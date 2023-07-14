import React from "react";

interface NoticePageProps {
  children: React.ReactNode
}

const layout = ({ children }: NoticePageProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default layout;
