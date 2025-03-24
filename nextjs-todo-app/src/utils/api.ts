export const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};

export const addTodo = async (todo) => {
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to add todo');
    }
    return response.json();
};