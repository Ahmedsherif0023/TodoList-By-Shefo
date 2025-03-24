import { NextApiRequest, NextApiResponse } from 'next';

let todos: { id: number; text: string; completed: boolean }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const { text } = req.body;
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}