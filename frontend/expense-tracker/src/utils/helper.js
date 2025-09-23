export const validateEmail=(email)=>{
const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    // First and last word
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};