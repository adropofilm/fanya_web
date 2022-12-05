import axios from 'axios';
import styles from './styles.module.css';
import { tryApiRequestCatchError } from "../../utility/api";

type TaskItemProps = {
    id: number;
    title: string;
    status: string;
    getAllTasks: () => Promise<void>;
}

const TaskItem = ({id, status, title, getAllTasks}: TaskItemProps) => {
    let taskBody = {
        status: "closed",
        id: id
    };
            
    const markTaskCompleted = async () => {
        await tryApiRequestCatchError(getAllTasks, axios.put, 200, `/${id}`, {task: taskBody});
    }

    const markTaskDeleted = async () => {
        await tryApiRequestCatchError(getAllTasks, axios.delete, 204, `/${id}`);
    }

    return (
        <div className={styles["container"]}>
            <input className="checkbox-input" role="checkbox" aria-checked="false" />
            <span className={styles["checkmark"]} onClick={markTaskCompleted}></span>
            <label>{title}</label>
            <span className={`material-symbols-outlined ${styles["delete-icon"]}`} onClick={markTaskDeleted}>delete</span>
        </div>
    )
}

export default TaskItem;