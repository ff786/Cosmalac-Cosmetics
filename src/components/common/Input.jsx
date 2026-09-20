import { forwardRef, useId } from "react";

const Input = forwardRef(
    (
        {
            label,
            name,
            type = "text",
            placeholder,
            value,
            onChange,
            error,
            hint,
            required = false,
            disabled = false,
            textarea = false,
            rows = 5,
            className = "",
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = name || generatedId;

        const classes = [
            "nuvia-input",
            error ? "nuvia-input--error" : "",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div className="nuvia-field">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="nuvia-field__label"
                    >
                        {label}

                        {required && (
                            <span
                                className="nuvia-field__required"
                                aria-hidden="true"
                            >
                *
              </span>
                        )}
                    </label>
                )}

                {textarea ? (
                    <textarea
                        ref={ref}
                        id={inputId}
                        name={name}
                        className={classes}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        rows={rows}
                        aria-invalid={Boolean(error)}
                        aria-describedby={
                            error
                                ? `${inputId}-error`
                                : hint
                                    ? `${inputId}-hint`
                                    : undefined
                        }
                        {...props}
                    />
                ) : (
                    <input
                        ref={ref}
                        id={inputId}
                        name={name}
                        type={type}
                        className={classes}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        aria-invalid={Boolean(error)}
                        aria-describedby={
                            error
                                ? `${inputId}-error`
                                : hint
                                    ? `${inputId}-hint`
                                    : undefined
                        }
                        {...props}
                    />
                )}

                {error && (
                    <span
                        id={`${inputId}-error`}
                        className="nuvia-field__error"
                    >
            {error}
          </span>
                )}

                {!error && hint && (
                    <span
                        id={`${inputId}-hint`}
                        className="nuvia-field__hint"
                    >
            {hint}
          </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;