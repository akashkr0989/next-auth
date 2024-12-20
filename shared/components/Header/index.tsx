import { useSession, signOut } from "next-auth/react";
import { Avatar, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <header
      style={{
        backgroundColor: "#4F46E5", // Custom Indigo color
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        padding: "10px 20px",
        color: "#fff"
      }}
    >
      <Flex
        justify="between"
        align="center"
        // style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Application Logo */}
        <Heading size="4" style={{ color: "white", fontWeight: "bold", cursor: "pointer" }}
        onClick={() => router.push("/")}
        >
          My Application
        </Heading>

        {session && (
          <Flex align="center" gap="4">
            <Button
              onClick={() => router.push("/video")}
              variant="solid"
              color="pink"
              style={{
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Video Player
            </Button>
          </Flex>
        )}

        {/* User Session */}
        {session ? (
          <Flex align="center" gap="4">
            <Avatar
              fallback="A"
              alt="User Avatar"
              size="3"
              src={session?.user?.image || ""}
              style={{ borderRadius: "50%", backgroundColor: "#D1D5DB" }}
            />
            <Text style={{ color: "white", fontWeight: "500" }}>
              Welcome, {session?.user?.name || "User"}
            </Text>
            <Button
              onClick={handleLogout}
              variant="solid"
              color="red"
              style={{
                backgroundColor: "#EF4444",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Logout
            </Button>
          </Flex>
        ) : null}
      </Flex>
    </header>
  );
};

export default Header;
