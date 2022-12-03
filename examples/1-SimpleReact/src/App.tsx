import "./App.css";
import { useUsersQuery } from "./generated/graphql.d";

function App() {
  const { data } = useUsersQuery();
  return (
    <div className="App">
      {data && data.users?.map((user) => <div>{user?.name}</div>)}
    </div>
  );
}

export default App;
