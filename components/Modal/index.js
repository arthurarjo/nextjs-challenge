import Button from "../Button";
import styles from "./Modal.module.css";
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;

  return (
    <div className={showHideClassName}>
      <section className={styles.modalMain}>
        {children}
        <Button onClick={handleClose}>close</Button>
      </section>
    </div>
  );
};

export default Modal;
