export const getBadge = (points) => {
    if (points >= 1000) return "🏆 Platinum";
    if (points >= 500) return "🥇 Gold";
    if (points >= 200) return "🥈 Silver";
    return "🥉 Bronze";
};
