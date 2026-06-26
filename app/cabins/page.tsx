import { User } from '@/types/user';

export default async function CabinPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/');
  const users: User[] = await res.json();

  return (
    <div>
      <h1>Cabins page</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
