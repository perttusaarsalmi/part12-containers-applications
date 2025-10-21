import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Todo from "../Todos/Todo";

describe("Todo component", () => {
  const mockDeleteTodo = vi.fn();
  const mockCompleteTodo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders todo text correctly", () => {
    const todo = {
      _id: "1",
      text: "Test todo",
      done: false,
    };

    render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it('shows "not done" status for incomplete todo', () => {
    const todo = {
      _id: "1",
      text: "Test todo",
      done: false,
    };

    render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    expect(screen.getByText("This todo is not done")).toBeInTheDocument();
    expect(screen.getByText("Set as done")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it('shows "done" status for completed todo', () => {
    const todo = {
      _id: "1",
      text: "Test todo",
      done: true,
    };

    render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    expect(screen.getByText("This todo is done")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.queryByText("Set as done")).not.toBeInTheDocument();
  });

  it("calls deleteTodo when delete button is clicked", async () => {
    const user = userEvent.setup();
    const todo = {
      _id: "1",
      text: "Test todo",
      done: false,
    };

    render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledWith(todo);
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  });

  it('calls completeTodo when "Set as done" button is clicked', async () => {
    const user = userEvent.setup();
    const todo = {
      _id: "1",
      text: "Test todo",
      done: false,
    };

    render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    const completeButton = screen.getByText("Set as done");
    await user.click(completeButton);

    expect(mockCompleteTodo).toHaveBeenCalledWith(todo);
    expect(mockCompleteTodo).toHaveBeenCalledTimes(1);
  });

  it('does not show "Set as done" button for completed todos', () => {
    const todo = {
      _id: "1",
      text: "Test todo",
      done: true,
    };

    render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    expect(screen.queryByText("Set as done")).not.toBeInTheDocument();
  });

  it("renders with correct styling", () => {
    const todo = {
      _id: "1",
      text: "Test todo",
      done: false,
    };

    const { container } = render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    const todoDiv = container.firstChild;
    expect(todoDiv).toHaveStyle({
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "70%",
      margin: "auto",
    });
  });
});
