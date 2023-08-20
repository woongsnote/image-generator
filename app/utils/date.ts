const currentDate = new Date(Date.now());

const year = currentDate.getFullYear();

const month = String(currentDate.getMonth() + 1).padStart(2, "0");

const day = String(currentDate.getDate()).padStart(2, "0");

export const formattedDate = `${year}-${month}-${day}`;
