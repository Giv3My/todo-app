import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import { addTodo, updateTodo, filterTodos } from '../redux/slices/todoSlice';

import { Button } from './Buttons';
import { MdOutlineClose } from 'react-icons/md';

import styles from '../styles/modules/modal.module.scss';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, handleToggleModal, todo }) {
  const dispatch = useDispatch();
  const { filterStatus } = useSelector(({ todo }) => todo);
  const [title, setTitle] = React.useState('');
  const [status, setStatus] = React.useState('incomplete');

  React.useEffect(() => {
    if (type === 'update') {
      setTitle(todo.title);
      setStatus(todo.status);
    }
  }, [type]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Please enter a title!");
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuidv4(),
            title,
            status,
            time: new Date().toLocaleString()
          })
        );
        dispatch(filterTodos(filterStatus));

        toast.success('Task Added Successfully');
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status
            })
          );
          dispatch(filterTodos(filterStatus));

          toast.success('Task Updated Successfully');
        } else {
          toast.error('No Changes Made');
          return;
        }
      }
      handleToggleModal();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.container}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={styles.closeButton}
            initial={{ top: 40, opacity: 0 }}
            animate={{ top: -10, opacity: 1 }}
            exit={{ top: 40, opacity: 0 }}
            onClick={handleToggleModal}
          >
            <MdOutlineClose />
          </motion.div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.formTitle}>
              {type === 'update' ? 'Update' : 'Add'} Task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={onChangeTitle}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={onChangeStatus}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type='submit' variant='primary'>
                {type === 'update' ? 'Update' : 'Add'} Task
              </Button>
              <Button
                type='button'
                variant='secondary'
                onClick={handleToggleModal}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TodoModal;