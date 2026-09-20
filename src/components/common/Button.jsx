/*
import React from 'react';
import './Button.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  href,
  className = '',
  ...props
}) {
  const classes = `button button--${variant} button--${size} ${fullWidth ? 'button--full' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {loading ? <span className="button__loader">Loading...</span> : children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? <span className="button__loader">Loading...</span> : children}
    </button>
  );
}

export default Button;
*/
import { forwardRef } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

const Button = forwardRef(
    (
        {
          children,
          variant = "primary",
          size = "medium",
          type = "button",
          href,
          icon,
          loading = false,
          disabled = false,
          fullWidth = false,
          className = "",
          onClick,
          ...props
        },
        ref
    ) => {
      const classes = [
        "nuvia-button",
        `nuvia-button--${variant}`,
        `nuvia-button--${size}`,
        fullWidth ? "nuvia-button--full" : "",
        className,
      ]
          .filter(Boolean)
          .join(" ");

      const content = (
          <>
            {loading ? (
                <Loader2 className="nuvia-button__icon nuvia-button__spinner" />
            ) : (
                icon && (
                    <span className="nuvia-button__icon">
              {icon}
            </span>
                )
            )}

            <span className="nuvia-button__label">
          {children}
        </span>
          </>
      );

      if (href) {
        return (
            <a
                ref={ref}
                href={href}
                className={classes}
                aria-disabled={disabled || loading}
                onClick={disabled || loading ? (e) => e.preventDefault() : onClick}
                {...props}
            >
              {content}
            </a>
        );
      }

      return (
          <button
              ref={ref}
              type={type}
              className={classes}
              disabled={disabled || loading}
              onClick={onClick}
              {...props}
          >
            {content}
          </button>
      );
    }
);

Button.displayName = "Button";

export default Button;