'use client';

import { Calendar, Clock, ListChecks, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Task } from '@/types/api';

const CATEGORIES = ['All', 'Home', 'Work', 'School', 'Personal'];
const FAMILY_MEMBERS = [
  {
    id: 1,
    name: 'John',
    initials: 'JD',
    image: '/placeholder.svg?height=32&width=32',
  },
  {
    id: 2,
    name: 'Sarah',
    initials: 'SJ',
    image: '/placeholder.svg?height=32&width=32',
  },
  {
    id: 3,
    name: 'Emma',
    initials: 'EJ',
    image: '/placeholder.svg?height=32&width=32',
  },
  {
    id: 4,
    name: 'Michael',
    initials: 'MJ',
    image: '/placeholder.svg?height=32&width=32',
  },
];

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Take out the trash',
    category: 'Home',
    assignedTo: 1,
    dueDate: '2023-06-15',
    completed: false,
  },
  {
    id: 2,
    title: 'Pick up kids from school',
    category: 'Personal',
    assignedTo: 2,
    dueDate: '2023-06-15',
    completed: false,
  },
  {
    id: 3,
    title: 'Complete homework',
    category: 'School',
    assignedTo: 3,
    dueDate: '2023-06-16',
    completed: true,
  },
  {
    id: 4,
    title: 'Prepare presentation',
    category: 'Work',
    assignedTo: 1,
    dueDate: '2023-06-17',
    completed: false,
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTasks = tasks.filter((task) => {
    if (activeCategory === 'All') {
      return true;
    }
    return task.category === activeCategory;
  });

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage family chores and to-dos.
          </p>
        </div>
        <AddTaskDialog tasks={tasks} setTasks={setTasks} />
      </div>

      <Tabs
        defaultValue="All"
        className="space-y-4"
        onValueChange={setActiveCategory}
        value={activeCategory}
      >
        <TabsList>
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  {filteredTasks.length} tasks in your list
                </CardDescription>
              </div>
              <ListChecks className="text-primary ml-auto size-5" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="flex h-20 items-center justify-center rounded-md border">
                    <p className="text-muted-foreground">
                      No tasks in this category
                    </p>
                  </div>
                ) : (
                  filteredTasks.map((task) => {
                    const assignedPerson = FAMILY_MEMBERS.find(
                      (member) => member.id === task.assignedTo,
                    );

                    return (
                      <div
                        key={task.id}
                        className="flex items-center justify-between rounded-md border p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                          />
                          <div className="grid gap-0.5">
                            <Label
                              htmlFor={`task-${task.id}`}
                              className={
                                task.completed
                                  ? 'text-muted-foreground line-through'
                                  : ''
                              }
                            >
                              {task.title}
                            </Label>
                            <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                              <span>{task.category}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <Calendar className="mr-1 size-3" />
                                <span>{task.dueDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Avatar className="size-6">
                            <AvatarImage
                              src={assignedPerson?.image}
                              alt={assignedPerson?.name}
                            />
                            <AvatarFallback>
                              {assignedPerson?.initials}
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash className="size-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AddTaskDialog({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Home',
    assignedTo: 1,
    dueDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTask.title.trim() === '') return;

    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

    setTasks([
      ...tasks,
      {
        id: newId,
        title: newTask.title,
        category: newTask.category,
        assignedTo: newTask.assignedTo,
        dueDate: newTask.dueDate,
        completed: false,
      },
    ]);

    setNewTask({
      title: '',
      category: 'Home',
      assignedTo: 1,
      dueDate: new Date().toISOString().split('T')[0],
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Add a new task to your family's to-do list.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newTask.category}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.filter((cat) => cat !== 'All').map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select
                value={newTask.assignedTo.toString()}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, assignedTo: Number.parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select family member" />
                </SelectTrigger>
                <SelectContent>
                  {FAMILY_MEMBERS.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="flex items-center">
                <Clock className="text-muted-foreground mr-2 size-4" />
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
