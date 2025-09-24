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


export const addThousandsSeparator=(num)=>{
    if(num==null || isNaN(num)) return "";

    const [integerPart,fractionalPart]=num.toString().split(".");
    const formattedInteger =integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    :formattedInteger;

};


export const prepareExpenseBarChartData=(data =[])=>{
    const chartData=data.map((item)=>({
        category:item?.category,
        amount:item?.amount,
    }));

    return chartData;
}