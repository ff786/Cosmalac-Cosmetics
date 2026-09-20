const Card = ({
                  children,
                  variant = "default",
                  padding = "medium",
                  hover = false,
                  className = "",
                  onClick,
                  ...props
              }) => {
    const classes = [
        "nuvia-card",
        `nuvia-card--${variant}`,
        `nuvia-card--padding-${padding}`,
        hover ? "nuvia-card--hover" : "",
        onClick ? "nuvia-card--clickable" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={classes}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;