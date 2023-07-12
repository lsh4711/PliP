import { useQuery } from '@tanstack/react-query';
import instance from './axiosinstance';

interface User {
  nickname: string;
}

const getUsers = async () => {
  const response = await instance.get<User>('/api/users', {
    withCredentials: true,
  });
  return response;
};

const useInquireUsersQuery = () => {
  const inquireUsers = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    suspense: true,
    retry: 1,
    staleTime: 2 * 60 * 1000,
    cacheTime: 4 * 60 * 1000,
  });
  return inquireUsers;
};

export default useInquireUsersQuery;
