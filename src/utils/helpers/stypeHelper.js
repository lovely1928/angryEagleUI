import moment from "moment-timezone";

const tailwindColors = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500',
  'bg-amber-500', 'bg-lime-500', 'bg-emerald-500', 'bg-fuchsia-500'
];

// Function to get a random Tailwind background color class
export const getRandomColor = () => {
  // Pick a random index from the color array
  const randomIndex = Math.floor(Math.random() * tailwindColors.length);
  // Return the random color class
  return tailwindColors[randomIndex];
};

export function calculateYearsFromMs(startDateMs) {
  if (typeof startDateMs !== "number" || startDateMs <= 0) {
    throw new Error("Invalid start date. Provide a valid date in milliseconds.");
  }

  // Convert the ms timestamp to a moment object
  const startDate = moment(startDateMs);

  // Get the current date
  const currentDate = moment();

  // Calculate the difference in years (with decimals)
  const yearsDifference = currentDate.diff(startDate, 'years', true);

  // Round the result to 1 decimal place
  return Math.round(yearsDifference * 10) / 10;
}