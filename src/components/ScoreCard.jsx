const ScoreCard = ({ label, score, color }) => {
  const colors = {
    blue: "bg-blue-500",
    gray: "bg-gray-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div
      className={`${colors[color]} rounded-2xl p-4 text-center shadow-lg transform transition hover:scale-105`}
    >
      <div className="text-white text-lg font-medium">{label}</div>
      <div className="text-white text-2xl font-bold">{score}</div>
    </div>
  );
};

export default ScoreCard;
