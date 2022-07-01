const ButtonTheme = ({ theme, changeTheme }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-800 shadow-sm rounded-full overflow-hidden p-1 mr-2"
        onClick={changeTheme}
      >
        {theme === "dark" ? (
          <svg
            className="w-8 h-8 fill-white"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M200 400C200 276.2 300.3 176 423.8 176C435.16 176 453.5 177.668 464.7 179.746C474.316 181.523 476.45 194.376 467.979 199.186C413 230.5 379.2 288.6 379.2 351.8C379.2 461.5 478.91 544.8 587.5 524.1C597.061 522.295 603.78 533.424 597.61 541.05C555.9 592.6 492.8 624 423.8 624C300.1 624 200 523.6 200 400Z" />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 fill-white"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M400 303.992C346.98 303.992 304.9 346.972 304.9 399.092C304.9 451.212 346.1 495.992 400 495.992C453.9 495.992 495.1 453.012 495.1 400.892C495.1 348.772 453 303.992 400 303.992ZM653.3 491.892L590.1 399.992L653.25 308.982C659.582 299.857 654.354 287.242 643.424 285.262L534.424 265.562L514.724 156.562C512.749 145.632 500.134 140.402 491.004 146.738L400 210.782L308.1 147.628C298.975 141.296 286.36 146.521 284.38 157.452L265.6 266.492L156.56 286.192C145.633 288.092 140.404 300.792 146.736 308.992L209.89 400.892L146.74 491.902C140.408 501.027 145.635 513.642 156.564 515.622L265.564 535.322L285.264 644.322C287.239 655.252 299.854 660.482 308.984 654.146L400 590.992L491.01 654.142C500.137 660.476 512.76 655.249 514.73 644.32L534.43 535.32L643.43 515.62C654.4 513.692 659.6 500.992 653.3 491.892ZM400 527.992C329.31 527.992 272.9 470.682 272.9 400.892C272.9 330.202 330.21 273.792 400 273.792C469.79 273.792 527.1 331.092 527.1 400.892C527.1 471.592 470.7 527.992 400 527.992Z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ButtonTheme;