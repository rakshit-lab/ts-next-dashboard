import { Member } from '@/types';

interface MemberCardProps {
  member: Member;
  onDelete: (id: number) => void;
}

export default function MemberCard({ member, onDelete }: MemberCardProps) {
  return (
    
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{member.name}</h3>
          <p className="text-gray-500 text-sm">{member.email}</p>
          {/* Using Union Types for conditional styling */}
          <span className={`text-xs px-2 py-1 rounded ${
            member.role === 'Admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {member.role}
          </span>
        </div>
        <button 
          onClick={() => onDelete(member.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
      {/* Optional property check */}
      {member.bio && <p className="mt-2 text-sm italic text-gray-600">"{member.bio}"</p>}
    </div>
  );
}