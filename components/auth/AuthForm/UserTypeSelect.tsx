import { UserType } from "types/enums/user.enum";
import styles from "./UserTypeSelect.module.scss";

interface UserTypeSelectProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
}

const RadioButtonIcon = () => {
  return (
    <svg viewBox="0 0 35.6 35.6">
      <circle className={styles.background} cx="17.8" cy="17.8" r="17.8" />
      <circle className={styles.stroke} cx="17.8" cy="17.8" r="14.37" />
      <polyline className={styles.check} points="11.78 18.12 15.55 22.23 25.17 12.87" />
    </svg>
  );
};

const UserTypeSelect = ({
  onChange,
}: UserTypeSelectProps) => {
  return (
    <div className={styles.box}>
      <legend className={styles.label}>회원 유형</legend>
      <div className={styles.inputListContainer}>
        <div className={styles.inputContainer}>
          <input
            onChange={(e) => { onChange(e); }}
            defaultChecked
            type="radio"
            name="type"
            value={UserType.EMPLOYEE}
          />
          <div>
            <div className={styles.iconBox}>
              <RadioButtonIcon />
            </div>
            <span>알바님</span>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <input
            onChange={(e) => { onChange(e); }}
            type="radio"
            name="type"
            value={UserType.EMPLOYER}
          />
          <div>
            <div className={styles.iconBox}>
              <RadioButtonIcon />
            </div>
            <span>사장님</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelect;
