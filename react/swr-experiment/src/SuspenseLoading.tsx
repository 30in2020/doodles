import React, { Suspense } from "react";
import useSWR from "swr";

interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

const SuspenseLoading: React.FC = () => {
  return (
    <div style={{ height: 150 }}>
      <h3>Suspense Loading</h3>
      <Suspense fallback={<div>loading...</div>}>
        <ChildComp />
      </Suspense>
    </div>
  );
};

const ChildComp: React.FC = () => {
  const { isValidating, data: users = [], error } = useSWR<IUser[]>(
    "/users",
    (url: string) =>
      fetch(
        `https://jsonplaceholder.typicode.com${url}`
      ).then((res: Response) => res.json()),
    {
      refreshInterval: 5000,
      suspense: true
    }
  );
  return (
    <div>
      {users.slice(0, 5).map(user => (
        <div key={user.id}>
          <div>{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default SuspenseLoading;
