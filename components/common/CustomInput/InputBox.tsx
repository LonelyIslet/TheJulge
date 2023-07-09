import styles from "./CustomInput.module.scss";

interface InputBoxProps {
  children?: React.ReactNode;
}

const InputBox = ({ children }: InputBoxProps) => {
  return (
    <div className={styles.box}>
      {children}
    </div>
  );
};

export default InputBox;
