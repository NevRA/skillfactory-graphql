import "./App.css";
import { useState } from "react";
import { useUsersQuery, useUpdateUserMutation } from "./generated/graphql.d";

const App = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const { data } = useUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const handleUpdate = () => {
    updateUser({
      variables: {
        id,
        name,
        age,
      },
    });
  };

  return (
    <div className="App">
      <div className="container">
        {data &&
          data.users?.map((user) => (
            <div className="card" key={user?.id}>
              <div className="user-id">{user?.id}</div>
              <div className="user-name">
                {user?.name} {`${user?.age} y/o`}
              </div>
            </div>
          ))}
      </div>
      <div className="card-edit">
        <input onChange={(e) => setId(e.target.value)} />
        <input onChange={(e) => setName(e.target.value)} />
        <input onChange={(e) => setAge(Number(e.target.value))} />
        <button onClick={handleUpdate}>update</button>
      </div>
    </div>
  );
};

export default App;
