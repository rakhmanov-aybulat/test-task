import React, { useRef, useEffect, useState } from "react";
import Modal from "./Modal";
import Task from '../types/Task';
import { Status } from '../types/Status';
import styles from './TaskForm.module.css';


export type TaskFormMode = 'create' | 'edit';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  taskFormMode: TaskFormMode;
}

const TaskForm: React.FC<TaskFormProps> = ({
    isOpen, onClose, onSubmit, taskFormMode }) => {
  const focusInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Focus on the title field when modal opens
  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      // TODO: add beautiful error message
      alert('Title must be filled out')
      return
    };
    let taskId = -1;
    if (taskFormMode == 'edit') {
      console.error(e.target);
    } 
    onSubmit({
      id: taskId,
      title: title,
      description: description,
      status: Status.ASSIGNED
    });
    setTitle('');
    setDescription('');
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <input
          ref={focusInputRef}
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
        <input
          type="text"
          placeholder="Add a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

