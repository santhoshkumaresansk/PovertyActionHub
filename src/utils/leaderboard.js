export const getLeaderboard = () => {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    return Object.entries(users).map(([userId, points]) => ({ userId, points }))
        .sort((a, b) => b.points - a.points);
};

export const resetLeaderboard = () => {
    localStorage.setItem("leaderboardHistory", JSON.stringify(getLeaderboard()));
    localStorage.setItem("users", JSON.stringify({}));
};