import { useRouter } from "next/router";
import { useUser } from "src/hooks/useLogin";

const Home = () => {
  const { data } = useUser();
  const { push } = useRouter();
  if (data?.id) {
    typeof window !== "undefined" && push("/goal");
  } else {
    typeof window !== "undefined" && push("/login");
  }
  return null;
};

export default Home;
