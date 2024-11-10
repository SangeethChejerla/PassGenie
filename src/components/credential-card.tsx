// src/components/credential-card.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Credential } from '@/db/schema';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CredentialCardProps {
  credential: Credential;
}

export function CredentialCard({ credential }: CredentialCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = async (
    text: string,
    type: 'username' | 'password'
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied!`, {
        description: `${type} has been copied to clipboard`,
      });
    } catch (error) {
      toast.error(`Failed to copy ${type}`, {
        description: 'Please try again',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {credential.provider}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{credential.provider}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Username:</span>
            <div className="flex items-center gap-2">
              <span>{credential.username}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(credential.username, 'username')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Password:</span>
            <div className="flex items-center gap-2">
              <span>{credential.password}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(credential.password, 'password')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
