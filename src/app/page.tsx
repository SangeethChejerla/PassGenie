'use client';

import { CredentialCard } from '@/components/credential-card';
import Plus from '@/components/plus';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Credential } from '@/db/schema';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const fetchCredentials = async () => {
    const loadingToast = toast.loading('Loading credentials...');
    try {
      const response = await fetch('/api/credentials');
      if (!response.ok) {
        throw new Error('Failed to fetch credentials');
      }
      const data = await response.json();
      setCredentials(data);
      toast.dismiss(loadingToast);
      toast.success('Credentials loaded successfully!');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to load credentials', {
        description: 'Please try again later',
      });
      console.error('Error fetching credentials:', error);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex gap-4">
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">View all</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Stored Credentials</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {credentials.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No credentials stored yet
                </p>
              ) : (
                credentials.map((credential) => (
                  <CredentialCard key={credential.id} credential={credential} />
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
        <Plus onCredentialAdded={fetchCredentials} />
      </div>
    </div>
  );
}
