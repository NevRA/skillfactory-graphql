import "./App.css";
import { useUsersQuery } from "./generated/graphql.d";

const App = () => {
  const { data } = useUsersQuery();
  return (
    <div className="App">
      {data &&
        data.users?.map((user) => (
          <div className="card">
            <div className="user-id">{user?.id}</div>
            <div className="user-name">{user?.name} {`${user?.age} y/o`}</div>
          </div>
        ))}
    </div>
  );
};

export default App;
