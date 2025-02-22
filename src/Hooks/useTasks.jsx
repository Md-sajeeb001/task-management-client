import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  return useQuery({
    queryKey: ["tasks", user?.email], // Ensure query is refetched when email changes
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user?.email}`);
      console.log(data);
      return data;
    },
    enabled: !!user?.email, // Prevents query from running if email is null
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

export default useTasks;
