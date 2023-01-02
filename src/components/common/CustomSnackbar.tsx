import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  closeSnackbar,
  selectIsSnackbarOpen,
  selectSnackbarContent,
} from "../../store/features/snackbarSlice";
import styles from "./CustomSnackbar.module.css";

export const CustomSnackbar = (): ReactElement => {
  const dispatch = useAppDispatch();
  const isSnackbarOpen = useAppSelector(selectIsSnackbarOpen);
  const snackbarContent = useAppSelector(selectSnackbarContent);

  const handleClose = (): void => {
    dispatch(closeSnackbar());
  };

  useEffect(() => {
    if (isSnackbarOpen) {
      setTimeout(() => {
        dispatch(closeSnackbar());
      }, 5000);
    }
  }, [isSnackbarOpen, dispatch]);

  return (
    <>
      {isSnackbarOpen && (
        <div className={styles["snackbar"]}>
          <span className={styles["snackbar-btn"]} onClick={handleClose}>
            x
          </span>
          {snackbarContent}
        </div>
      )}
    </>
  );
};
