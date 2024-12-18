import { GetServerSideProps } from "next";
import { Flex, Card, Heading, Text, Avatar, Button } from "@radix-ui/themes";
import { useRouter } from "next/router";

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface DashboardProps {
  users: User[];
}

const DashboardData = ({ users }: DashboardProps) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login"); // Redirect to login
  };

  return (
    <Flex
      direction="column"
      align="center"
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#F9FAFB",
      }}
    >
      {/* Header */}
      <Flex
        justify="between"
        align="center"
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "10px 20px",
          backgroundColor: "#4F46E5",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          color: "white",
        }}
      >
        <Heading size="4" style={{ color: "white" }}>
          Dashboard
        </Heading>
        <Button
          onClick={handleLogout}
          variant="solid"
          style={{
            backgroundColor: "#EF4444",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Logout
        </Button>
      </Flex>

      {/* User Cards */}
      <Flex
        wrap="wrap"
        justify="center"
        gap="4"
        style={{
          maxWidth: "1200px",
        }}
      >
        {users.map((user) => (
          <Card
            key={user.id}
            variant="surface"
            size="4"
            style={{
              width: "300px",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Flex direction="column" gap="3" align="center">
              <Avatar
                size="6"
                fallback={user.name[0]}
                style={{
                  backgroundColor: "#4F46E5",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
              <Heading size="3">{user.name}</Heading>
              <Text size="2" style={{ color: "#6B7280" }}>
                {user.email}
              </Text>
              <Text size="2" style={{ color: "#4B5563" }}>
                {user.company.name}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
};

export default DashboardData;
