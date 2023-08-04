export const caluculateBmi = (height, weight) => {
  return Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;
};

export const calculateBmr = ({ gender, age, height, weight, goal, activityLevel }) => {
  const basicBmr = 10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);
  const bmrActivityLevel = basicBmr * Number(activityLevel);
  return Math.floor(bmrActivityLevel + Number(goal));
};
