import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { format } from 'date-fns/esm';
import toast from 'react-hot-toast';

import { deleteTodo, updateTodo, filterTodos } from '../redux/slices/todoSlice';

import TodoModal from './TodoModal';
import { CheckButton } from './Buttons';
import { MdDelete, MdEdit } from 'react-icons/md';

import styles from '../styles/modules/todoItem.module.scss';
import { motion } from 'framer-motion';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ id, title, status, time }) {
  const dispatch = useDispatch();
  const { filterStatus } = useSelector(({ todo }) => todo);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [status]);

  const handleToggleUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(id));

    toast.success('Todo Deleted Successfully');
  };

  const handleCheckboxClick = () => {
    dispatch(
      updateTodo({
        id, title, time,
        status: checked ? 'incomplete' : 'complete'
      })
    );
    dispatch(filterTodos(filterStatus));

    setChecked(!checked);
  };

  return (
    <>
      <motion.div
        className={styles.item}
        variants={child}
      >
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} onCheckBoxCLick={handleCheckboxClick} />
          <div className={styles.texts}>
            <p
              className={classNames(
                styles.todoText,
                status === 'complete' ? styles['todoText--completed'] : ''
              )}
            >
              {title}
            </p>
            <p className={styles.time}>
              {format(new Date(time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleDeleteTodo}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleToggleUpdateModal}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      {updateModalOpen &&
        <TodoModal
          type='update'
          handleToggleModal={handleToggleUpdateModal}
          todo={{
            id,
            title,
            status
          }}
        />}
    </>
  );
}

export default TodoItem;