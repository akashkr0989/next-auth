import { Blockquote, Box, Heading } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  console.log(session);

  if (!session) return <p>Loading...</p>;

  return (
    <Box p={"5"}>
      <Heading>Welcome to the Dashboard</Heading>
      <Box maxWidth="500px" mt={"5"}>
        <Blockquote size="5">
          Name: {session?.user?.name} <br />
          Email: {session?.user?.email}
        </Blockquote>
      </Box>
    </Box>
  );
};

export default Dashboard;
