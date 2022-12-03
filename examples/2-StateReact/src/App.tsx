import "./App.css";
import { useRef } from "react";
import { useUsersQuery, useUpdateUserMutation } from "./generated/graphql.d";

const App = () => {
  const { data } = useUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const handleUpdate = () => {
    updateUser({
      variables: {
        id: String(idRef.current?.value),
        name: String(nameRef.current?.value),
        age: Number(ageRef.current?.value),
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
        <input ref={idRef} />
        <input ref={nameRef} />
        <input ref={ageRef} />
        <button onClick={handleUpdate}>update</button>
      </div>
    </div>
  );
};

export default App;
