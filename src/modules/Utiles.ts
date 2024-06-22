
 export const formatTimestamp = (timestamp: any) => {
   const date = new Date(timestamp);
   return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

export const formatDate = (timestamp: any) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

export const ShowToster = (toast: any, title: string, subTitle: string, type: string) => {
  toast.hideAll();
  toast.show(title, {
      type: 'custom_type',
      data: {
          title: subTitle,
          type: type,
          sideColor: type === 'success'? 'green' : 'red'
      },
      placement: 'top',
      duration: 3000,
      animationType: 'slide-in',
  });
}