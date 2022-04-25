import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateFilterStatus, filterTodos } from '../redux/slices/todoSlice';

import { Button, SelectedButton } from './Buttons';
import TodoModal from './TodoModal';

import styles from '../styles/modules/app.module.scss';

function AppHeader() {
  const dispatch = useDispatch();
  const { filterStatus } = useSelector(({ todo }) => todo);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    JSON.parse(localStorage.getItem('todoList')).length &&
      dispatch(filterTodos(filterStatus));
  }, [filterStatus]);

  const handleToggleAddModal = () => {
    setModalOpen(!modalOpen);
  };

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button
        variant='primary'
        type='button'
        onClick={handleToggleAddModal}
      >
        Add Task
      </Button>
      <SelectedButton
        id="status"
        value={filterStatus}
        onSelectFilter={updateFilter}
      >
        <option value="all">ALL</option>
        <option value="incomplete">Incomoplete</option>
        <option value="complete">Complete</option>
      </SelectedButton>
      {modalOpen &&
        <TodoModal
          type="add"
          handleToggleModal={handleToggleAddModal}
        />}
    </div>
  );
}

export default AppHeader;