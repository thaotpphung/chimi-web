'use client';

import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Event, FamilyMember } from '@/types/api';

const DAYS: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FAMILY_MEMBERS: FamilyMember[] = [
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

const EVENTS: Event[] = [
  {
    id: 1,
    title: 'Doctor Appointment',
    date: '2023-06-15',
    time: '10:00 AM',
    category: 'Health',
    participants: [1, 3],
    description: 'Annual checkup for Emma',
  },
  {
    id: 2,
    title: 'Soccer Practice',
    date: '2023-06-15',
    time: '4:00 PM',
    category: 'Sports',
    participants: [4],
    description: 'Weekly soccer practice',
  },
  {
    id: 3,
    title: 'Family Dinner',
    date: '2023-06-17',
    time: '6:30 PM',
    category: 'Family',
    participants: [1, 2, 3, 4],
    description: "Dinner at Grandma's house",
  },
  {
    id: 4,
    title: 'Parent-Teacher Conference',
    date: '2023-06-20',
    time: '3:00 PM',
    category: 'School',
    participants: [2, 3],
    description: "Meeting with Emma's teacher",
  },
];

type Day = number | null;

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(EVENTS);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const days: Day[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getEventsForDay = (day: Day) => {
    if (!day) return [];

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((event) => event.date === dateStr);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Family Calendar</h1>
          <p className="text-muted-foreground">
            View and manage family events and appointments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm font-medium">
            {MONTHS[currentMonth]} {currentYear}
          </span>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="size-4" />
          </Button>
          <AddEventDialog events={events} setEvents={setEvents} />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 text-center">
            {DAYS.map((day: string) => (
              <div key={day} className="border-b py-2 font-medium">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const eventsForDay = getEventsForDay(day);
              const isToday =
                day === new Date().getDate() &&
                currentMonth === new Date().getMonth() &&
                currentYear === new Date().getFullYear();

              return (
                <div
                  key={index}
                  className={`min-h-[100px] border border-t-0 p-1 ${
                    index % 7 === 0 ? 'border-l' : 'border-l-0'
                  } ${isToday ? 'bg-muted/50' : ''}`}
                >
                  {day && (
                    <div className="h-full">
                      <div className="flex justify-end">
                        <span
                          className={`text-sm ${isToday ? 'font-bold' : ''}`}
                        >
                          {day}
                        </span>
                      </div>
                      <div className="mt-1 space-y-1">
                        {eventsForDay.map((event) => (
                          <div
                            key={event.id}
                            className="bg-primary/10 text-primary truncate rounded p-1 text-xs"
                            title={event.title}
                          >
                            {event.time} - {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            View your family's upcoming events and appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="flex h-20 items-center justify-center rounded-md border">
                <p className="text-muted-foreground">No upcoming events</p>
              </div>
            ) : (
              events.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="flex items-start justify-between rounded-md border p-3"
                >
                  <div className="grid gap-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="text-muted-foreground text-sm">
                      {event.date} at {event.time}
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {event.category}
                    </Badge>
                    <div className="mt-1 flex items-center gap-1">
                      {event.participants.map((participantId) => {
                        const participant = FAMILY_MEMBERS.find(
                          (member) => member.id === participantId,
                        );
                        return (
                          <Avatar key={participantId} className="size-6">
                            <AvatarImage
                              src={participant?.image}
                              alt={participant?.name}
                            />
                            <AvatarFallback>
                              {participant?.initials}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Events
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function AddEventDialog({
  events,
  setEvents,
}: {
  events: Event[];
  setEvents: any;
}) {
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<any>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    category: 'Family',
    participants: [],
    description: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newEvent.title.trim() === '') return;

    const newId =
      events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1;

    setEvents([
      ...events,
      {
        id: newId,
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        category: newEvent.category,
        participants: newEvent.participants,
        description: newEvent.description,
      },
    ]);

    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      category: 'Family',
      participants: [],
      description: '',
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>
              Add a new event to your family calendar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newEvent.category}
                onValueChange={(value) =>
                  setNewEvent({ ...newEvent, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Participants</Label>
              <div className="flex flex-wrap gap-2">
                {FAMILY_MEMBERS.map((member) => (
                  <div
                    key={member.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-md p-2 ${
                      newEvent.participants.includes(member.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                    onClick={() => {
                      if (newEvent.participants.includes(member.id)) {
                        setNewEvent({
                          ...newEvent,
                          participants: newEvent.participants.filter(
                            (id: number) => id !== member.id,
                          ),
                        });
                      } else {
                        setNewEvent({
                          ...newEvent,
                          participants: [...newEvent.participants, member.id],
                        });
                      }
                    }}
                  >
                    <Avatar className="size-6">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter event description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
