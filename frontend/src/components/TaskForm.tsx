import React, { useRef, useEffect, useState } from "react";
import Modal from "./Modal";
import Task from '../types/Task';
import { Status } from '../types/Status';
import styles from './TaskForm.module.css';


export type TaskFormMode = 'create' | 'edit';

export interface TaskFormData {
  task: Task;
}
export const defaultTaskFormData = {
  task: { id: -1, title: '', description: '', status: Status.ASSIGNED}
}

interface TaskFormProps {
  isOpen: boolean;
  taskFormMode: TaskFormMode;
  modalData: TaskFormData;
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id'>) => void;
  onUpdate: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
    isOpen, taskFormMode, modalData, onClose, onCreate, onUpdate }) => {
  const focusInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<TaskFormData>(modalData);

  // Focus on the title field when modal opens
  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
      setFormData(modalData);
    }
  }, [isOpen]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return ({ task: {...prev.task, [name]: value }});
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.task.title.trim()) {
      // TODO: add beautiful error message
      alert('Title must be filled out')
      return
    };
    if (taskFormMode == 'edit') {
      onUpdate(formData.task) 
    } else if (taskFormMode == 'create') {
      onCreate({ ...formData.task, status: Status.ASSIGNED });
    }
  };

  const handleClose = () => {
    setFormData(defaultTaskFormData);
    onClose();
  };

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <input
          ref={focusInputRef}
          type="text"
          name="title"
          placeholder="Add a new task..."
          value={formData.task.title}
          onChange={handleInputChange}
          className={styles.titleInput}
        />
        <input
          type="text"
          name="description"
          placeholder="Add a description"
          value={formData.task.description}
          onChange={handleInputChange}
          className={styles.descriptionTextArea}
        />
        <button
          type="submit"
          className={styles.createTaskButton}
        >
          {taskFormMode == 'create' ? <>Create</> : <>Edit</>}
          {/* TODO: check condition above */}
        </button>
      </form>
    </Modal>
  );
};

export default TaskForm;

