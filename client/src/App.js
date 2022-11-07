import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction, getUserByIdAction, getUserByNameAction } from './redux/reducers/dataBack/manageUsers/manageUsersActions';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.manageUsers.users);
  const details = useSelector(state => state.manageUsers.details);

  useEffect(() => {
    dispatch(getUsersAction());
    dispatch(getUserByIdAction(57));
    dispatch(getUserByNameAction('old'));
  }, [])

  return (
    <div className="App">
      <h1>Hola!</h1>
      <ul>
          {users && users.map(e => {
            return <li>
              {e.nombre}
            </li>
          })}
      </ul>

      <p>{details.nombre}</p>
    </div>
  );
}

export default App;