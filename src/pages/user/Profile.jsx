import { useParams } from "react-router-dom";

export function Profile() {
  const { userId } = useParams();

  return (
    <main>
      <h1>User Profile de {userId}</h1>
    </main>
  );
}
