 export const formatTimestamp = (timestamp: any) => {
   const date = new Date(timestamp);
   return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

export const formatDate = (timestamp: any) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

