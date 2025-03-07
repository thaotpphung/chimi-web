'use client';

import { Cake, Calendar, Edit, Plus, Trash } from 'lucide-react';
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
import { FamilyMember } from '@/types/api';

const INITIAL_FAMILY_MEMBERS = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Parent',
    birthdate: '1980-05-15',
    image: '/placeholder.svg?height=100&width=100',
    initials: 'JD',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Parent',
    birthdate: '1982-08-22',
    image: '/placeholder.svg?height=100&width=100',
    initials: 'SJ',
  },
  {
    id: 3,
    name: 'Emma Doe',
    role: 'Child',
    birthdate: '2012-03-10',
    image: '/placeholder.svg?height=100&width=100',
    initials: 'ED',
  },
  {
    id: 4,
    name: 'Michael Doe',
    role: 'Child',
    birthdate: '2015-11-05',
    image: '/placeholder.svg?height=100&width=100',
    initials: 'MD',
  },
];

export default function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState(INITIAL_FAMILY_MEMBERS);

  const deleteMember = (id: number) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Family Members</h1>
          <p className="text-muted-foreground">
            Manage your family members and their information.
          </p>
        </div>
        <AddMemberDialog
          familyMembers={familyMembers}
          setFamilyMembers={setFamilyMembers}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {familyMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="size-14">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>
                  <Badge variant="outline">{member.role}</Badge>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Cake className="text-muted-foreground mr-2 size-4" />
                  <span>Birthday: {member.birthdate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="text-muted-foreground mr-2 size-4" />
                  <span>Age: {calculateAge(member.birthdate)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 size-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteMember(member.id)}
              >
                <Trash className="mr-2 size-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function calculateAge(birthdate: string) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function AddMemberDialog({
  familyMembers,
  setFamilyMembers,
}: {
  familyMembers: FamilyMember[];
  setFamilyMembers: any;
}) {
  const [open, setOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: 'Child',
    birthdate: '',
    image: '/placeholder.svg?height=100&width=100',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMember.name.trim() === '') return;

    const newId =
      familyMembers.length > 0
        ? Math.max(...familyMembers.map((member) => member.id)) + 1
        : 1;
    const nameParts = newMember.name.split(' ');
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}${nameParts[0][1] || ''}`;

    setFamilyMembers([
      ...familyMembers,
      {
        id: newId,
        name: newMember.name,
        role: newMember.role,
        birthdate: newMember.birthdate,
        image: newMember.image,
        initials: initials.toUpperCase(),
      },
    ]);

    setNewMember({
      name: '',
      role: 'Child',
      birthdate: '',
      image: '/placeholder.svg?height=100&width=100',
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Family Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>
              Add a new member to your family.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
                }
              >
                <option value="Parent">Parent</option>
                <option value="Child">Child</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthdate">Birthdate</Label>
              <Input
                id="birthdate"
                type="date"
                value={newMember.birthdate}
                onChange={(e) =>
                  setNewMember({ ...newMember, birthdate: e.target.value })
                }
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
