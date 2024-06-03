 export const formatTimestamp = (timestamp: any) => {
   const date = new Date(timestamp);
   return date.toLocaleTimeString();
};

