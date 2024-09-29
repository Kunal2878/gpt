import * as React from "react"
// import useSWR from 'swr';
// function MyComponent() {
// //   const { data, error, mutate } = useSWR('my-key', fetcher);
//   const fetcher = (...args) => fetch(...args).then((res) => res.json());
//   const { data, error } = useSWR("api/user", fetcher);
//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;

//   return (
//     <div>
//       {data.map(item => (
//         <div key={item.id}>{item.name}</div>
//       ))}
//       <button onClick={() => mutate([...data, { id: Date.now(), name: 'New Item' }])}>
//         Add Item
//       </button>
//     </div>
//   );
// }

// // async function fetcher() {
// //   const res = await fetch('/api/data');
// //   return res.json();
// // }
// export



import useSWR from "swr";

export default function Useuser() {
  const fetcher = (url: string) => fetch("/api/user").then((res) => res.json());

  const { data, error, mutate } = useSWR("/api/user", fetcher);

  if (error) return <p>No person found</p>;
  if (!data) return <p>Loading...</p>;

  const updateName = (newName: string) => {
    mutate({ ...data, name: newName }, false);
  };

  return (
    <div>
      <h1>The winner of the competition:</h1>
      <h2>
        {data.name} {data.surname}
      </h2>
      <input
        type="text"
        value={data.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Enter new name"
      />
    </div>
  );
}