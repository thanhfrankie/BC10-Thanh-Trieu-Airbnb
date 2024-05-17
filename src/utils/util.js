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
export const renderAvatar = (user, widthValue=8, heightValue=8) => {
  if (user) {
    const width = `${widthValue}`
    const height = `${heightValue}`
    return user.avatar === "" ? (
      <div className={`w-${width} h-${height} flex items-center justify-center bg-indigo-400 text-white text-sm rounded-full `}>
        {" "}
        {user.name.substring(0, 2).toUpperCase()}
      </div>
    ) : (
      <img src={user.avatar} alt="" className={`flex items-center justify-center rounded-full object-cover w-${width} h-${height}`} />
    );
  }
  return null;
};
export const calculateNext7DaysTime =() => {
  const today = new Date();
  const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  next7Days.setHours(12);
  next7Days.setMinutes(0);
  
  const formattedDate = next7Days.toLocaleString('vi-VN', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  
  return formattedDate;
}
export const  handleCountDaysBetweenDates =(date1, date2) =>{
  const oneDay = 24 * 60 * 60 * 1000; 
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const diffInMilliseconds = Math.abs(firstDate - secondDate);

  return Math.round(diffInMilliseconds / oneDay);
}