export const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
};

export const formatDateWhithHours = (date) => {
    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false }; // Utiliser 24 heures
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', optionsDate);
    const formattedTime = new Date(date).toLocaleTimeString('fr-FR', optionsTime);
    return `${formattedDate} - ${formattedTime}`; 
};