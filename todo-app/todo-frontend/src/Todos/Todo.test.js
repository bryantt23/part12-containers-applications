// Todo.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from './Todo';

describe('Todo Component', () => {
    const mockDeleteTodo = jest.fn();
    const mockCompleteTodo = jest.fn();
    const todo = { id: 1, text: 'Test Todo', done: false };

    it('renders Todo text', () => {
        render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />);
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    it('calls completeTodo when "Set as done" is clicked', () => {
        render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />);
        fireEvent.click(screen.getByText('Set as done'));
        expect(mockCompleteTodo).toHaveBeenCalledWith(todo);
    });

    // Add more tests as needed
});
