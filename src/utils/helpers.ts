export const newId = () => crypto.randomUUID();

export const formatDateForInput = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateForDisplay = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const daySuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const month = date.toLocaleString("en-US", { month: "long" });
  return `${day}${daySuffix(day)} ${month}`;
};
