const WHATSAPP_NUMBER = "+971559915823";
const WHATSAPP_MESSAGE =
    "Hello Cosmalac, I would like to chat with you.";

const WhatsAppChatButton = () => {
    const normalizedPhone = WHATSAPP_NUMBER.replace(/\D/g, "");
    const message = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl =
        `https://wa.me/${normalizedPhone}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="whatsapp-chat-button"
        >
            <span className="whatsapp-chat-button__icon" aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                >
                    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.55 0 .23 5.32.23 11.85c0 2.09.55 4.05 1.5 5.75L.14 24l6.55-1.57a11.8 11.8 0 0 0 5.39 1.29h.01c6.53 0 11.85-5.32 11.85-11.85 0-3.17-1.23-6.15-3.42-8.39ZM12.09 21.7h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.89.93.93-3.79-.23-.39a9.83 9.83 0 1 1 8.57 4.83Zm5.4-7.37c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.19.29-.75.95-.92 1.15-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.43-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.02c.15.19 2.06 3.14 4.99 4.4.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34Z" />
                </svg>
            </span>

            <span>Chat with us</span>
        </a>
    );
};

export default WhatsAppChatButton;
