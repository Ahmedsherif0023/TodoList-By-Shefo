import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import { fetchTodos } from '../utils/api';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };

    getTodos();
  }, []);

  return (
    <div>
      <Header />
      <TodoList todos={todos} />
    </div>
  );
};

export default Home;