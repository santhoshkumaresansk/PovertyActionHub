export const updatePoints = (userId, points) => {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    users[userId] = (users[userId] || 0) + points;
    localStorage.setItem("users", JSON.stringify(users));
};

export const getPoints = (userId) => {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    return users[userId] || 0;
};