export const createGroup = async (data: { group_name: string }) => {
  const response = await post('/api/groups', data);
  return response;
};
