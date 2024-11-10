// src/components/plus.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generateRandomPassword } from '@/lib/password';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FormData {
  provider: string;
  username: string;
  password: string;
}

interface PlusProps {
  onCredentialAdded: () => void;
}

export default function Plus({ onCredentialAdded }: PlusProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    provider: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading('Saving credential...');

    try {
      const response = await fetch('/api/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save credential');
      }

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Credential saved successfully!', {
        description: `Added ${formData.provider} credentials`,
      });

      setIsOpen(false);
      setFormData({ provider: '', username: '', password: '' });
      onCredentialAdded();
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error('Failed to save credential', {
        description: 'Please try again later',
      });
      console.error('Error saving credential:', error);
    }
  };

  const handleGeneratePassword = (): void => {
    const newPassword = generateRandomPassword(10);
    setFormData((prev) => ({ ...prev, password: newPassword }));
    toast.success('Password generated!', {
      description: 'A new secure password has been generated.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Input
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
              required
              placeholder="e.g., Google, Facebook, etc."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Enter username or email"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                name="password"
                type="text"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter password"
                className="w-full"
              />
            </div>
            <Button
              type="button"
              onClick={handleGeneratePassword}
              variant="secondary"
              className="w-full"
            >
              Generate Random Password
            </Button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setFormData({ provider: '', username: '', password: '' });
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
