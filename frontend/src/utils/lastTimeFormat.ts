export const lastTimeFormat = (timestamp: string): string  => {
    const currentTimestamp: number = Date.now();
    const previousTimestamp: number = new Date(timestamp).getTime();
    const timeDifferenceInMilliseconds: number = currentTimestamp - previousTimestamp;
  
    // Define time intervals in milliseconds
    const minute: number = 60 * 1000;
    const hour: number = 60 * minute;
    const day: number = 24 * hour;
    const month: number = 30 * day;
  
    if (timeDifferenceInMilliseconds < minute) {
      return "Just now";
    } else if (timeDifferenceInMilliseconds < hour) {
      const minutesAgo: number = Math.floor(timeDifferenceInMilliseconds / minute);
      return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
    } else if (timeDifferenceInMilliseconds < day) {
      const hoursAgo: number = Math.floor(timeDifferenceInMilliseconds / hour);
      return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
    } else if (timeDifferenceInMilliseconds < month) {
      const daysAgo: number = Math.floor(timeDifferenceInMilliseconds / day);
      return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    } else {
      const monthsAgo: number = Math.floor(timeDifferenceInMilliseconds / month);
      return `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`;
    }
  }


  
  
  // Example usage:
  const timestamp = "2023-07-28T06:28:41.119Z";
  const formattedTime: string = lastTimeFormat(timestamp);
  console.log(formattedTime); // Output: "2 months ago"
  