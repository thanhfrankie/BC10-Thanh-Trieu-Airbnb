export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveLocalStorage = (key, data) => {
  const stringData = JSON.stringify(data);
  return localStorage.setItem(key, stringData);
};
export const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};
export const checkEvenOrOdd = (checkedNumber, evenValue, oddValue) => {
  return checkedNumber % 2 === 0 ? evenValue : oddValue;
};

export const calculateTimeAgo=(commentDate) =>{
  let commentDateTime;

  if (commentDate.includes('GMT')) {
      commentDateTime = new Date(commentDate);
  } else if (commentDate.includes('/')) {
      const dateParts = commentDate.split('/');
      const commentYear = parseInt(dateParts[2]);
      const commentMonth = parseInt(dateParts[1]) - 1; 
      const commentDay = parseInt(dateParts[0]);
      commentDateTime = new Date(commentYear, commentMonth, commentDay);
  } else if (!isNaN(commentDate)) {
      commentDateTime = new Date(parseInt(commentDate)); 
  } else {
      commentDateTime = new Date(commentDate);
  }
  if (isNaN(commentDateTime.getTime())) {
    return 'Invalid date';
}
  const currentDate = new Date();
  const timeDifference = currentDate - commentDateTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  
  if (years > 0) {
      return `${years} năm trước`;
  } else if (months > 0) {
      return `${months} tháng trước`;
  } else if (days > 0) {
      return `${days} ngày trước`;
  } else if (hours > 0) {
      return `${hours} giờ trước`;
  } else if (minutes > 0) {
      return `${minutes} phút trước`;
  } else {
      return `Vừa xong`;
  }
}
export const calculateAverage = (array, fixed) => {
  if (array.length === 0) {
      return 0; 
  }
  const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue);
  const average =sum / array.length;
return parseFloat(average.toFixed(fixed))
}
