/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Blockquote, Box, Heading, Tab } from '@radix-ui/themes';
// import { useSession } from "next-auth/react";

// const Dashboard = () => {
//   const { data: session } = useSession();

//   console.log(session);

//   if (!session) return <p>Loading...</p>;

//   return (
//     <Box p={"5"}>
//       <Heading>Welcome to the Dashboard</Heading>
//       <Box maxWidth="500px" mt={"5"}>
//         <Blockquote size="5">
//           Name: {session?.user?.name} <br />
//           Email: {session?.user?.email}
//         </Blockquote>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  Card,
  Text,
  Blockquote
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toDoList, setToDoList] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const { data: session } = useSession();

  console.log(session);

  if (!session) return <p>Loading...</p>;

  const fetchRepos = async () => {
    if (!username) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await res.json();
      setRepos(data);
    } catch (error) {
      console.error("Failed to fetch repos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setToDoList([...toDoList, newTask]);
      setNewTask("");
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = toDoList.filter((_, i) => i !== index);
    setToDoList(updatedTasks);
  };

  return (
    <Box p="6" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Heading size="4" mb="6" align="center">
        Welcome to Your Dashboard
      </Heading>
      <Box maxWidth="500px" mt={"5"} mb="6">
        <Blockquote size="5">
          Name: {session?.user?.name} <br />
          Email: {session?.user?.email}
        </Blockquote>
      </Box>
      <Flex gap="6" direction="column">
        {/* GitHub Repos Section */}
        <Box>
          <Heading size="3" mb="3">
            GitHub Repository Stats
          </Heading>
          <Flex gap="3" align="center">
            <input
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                width: "300px"
              }}
            />
            <Button onClick={fetchRepos} variant="solid" disabled={loading}>
              {loading ? "Loading..." : "Search"}
            </Button>
          </Flex>
          <Flex direction="column" gap="4" mt="4">
            {repos.map((repo: any) => (
              <Card
                key={repo.id}
                variant="surface"
                size="3"
                style={{ padding: "20px", border: "1px solid #E5E7EB" }}
              >
                <Text>
                  <strong>{repo.name}</strong>
                </Text>
                <Text size="2" style={{ color: "#6B7280" }}>
                  {repo.description || "No description provided."}
                </Text>
                <Text size="2" style={{ color: "#4B5563" }}>
                  Stars: {repo.stargazers_count} | Forks: {repo.forks_count}
                </Text>
              </Card>
            ))}
          </Flex>
        </Box>

        {/* To-Do List Section */}
        <Box>
          <Heading size="3" mb="3">
            To-Do List
          </Heading>
          <Flex gap="3" align="center">
            <input
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                width: "300px"
              }}
            />
            <Button onClick={addTask} variant="solid">
              Add Task
            </Button>
          </Flex>
          <Flex direction="column" gap="3" mt="4">
            {toDoList.map((task, index) => (
              <Card
                key={index}
                variant="classic"
                size="2"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 15px",
                  border: "1px solid #D1D5DB"
                }}
              >
                <Text>{task}</Text>
                <Button
                  onClick={() => removeTask(index)}
                  variant="soft"
                  color="red"
                  style={{ fontSize: "14px" }}
                >
                  Remove
                </Button>
              </Card>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
