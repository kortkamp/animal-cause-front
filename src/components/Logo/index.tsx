const Logo = () => {

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill="#FF6347" />
      <text
        x="50"
        y="60"
        fontSize="40"
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
        fill="#FFFFFF"
      >
        Logo
      </text>
    </svg>
  );
};

export { Logo };