
export const useUser = () => {
  const user: Token = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const { token, User } = user;

    return { token, User };
  }

  return { token: null, User: null };
};
