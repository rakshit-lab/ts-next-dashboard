"use client";
import { useState, useEffect } from 'react';
import { Member, FormStatus } from '@/types';
import MemberCard from './components/memberCard';

export default function Dashboard() {
  // Type Inference vs Explicit Typing
  const [members, setMembers] = useState<Member[]>([]);
  const [status, setStatus] = useState<FormStatus>('idle');

  // Fetching Data with Type Safety
  useEffect(() => {
    const fetchMembers = async () => {
      setStatus('submitting');
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        
        // Mapping API data to our specific Member interface
        const formattedData: Member[] = data.map((user: any, index :number) => {
        
          return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: index % 2 === 0 ? 'Admin' : 'Viewer',
        };
        });
        
        setMembers(formattedData);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };
    fetchMembers();
  }, []);

  const handleDelete = (id: number) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Project Team</h1>
        <p className="text-sm text-gray-500">Total Members: {members.length}</p>
      </header>

      {status === 'submitting' && <p>Syncing with server...</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {members.map(member => (
          <MemberCard key={member.id} member={member} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}