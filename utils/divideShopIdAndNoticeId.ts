const extractPathVariable = (path: string) => {
  // 정규표현식을 사용하여 pathVariable 값을 추출
  const match = path.match(/\/shops\/([\w-]+)\/notices\/([\w-]+)/);
  if (match) {
    const [shopsId, noticesId] = match;
    return { shopsId, noticesId };
  }
  return { };
};

export default extractPathVariable;
