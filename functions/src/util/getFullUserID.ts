export const getFullUserIDFromValues = (
  id: string,
  service: 'spotify' | 'apple'
) => {
  return `${service}-${id}`;
};
