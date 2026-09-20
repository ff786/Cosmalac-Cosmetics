import {
    Award,
    FlaskConical,
    Gem,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

const trustItems = [
    {
        icon: FlaskConical,
        title: "Premium Ingredients",
        text: "Thoughtfully selected ingredients for refined skincare formulations.",
    },
    {
        icon: ShieldCheck,
        title: "Professional Manufacturing",
        text: "Produced with a strong focus on consistency, quality and care.",
    },
    {
        icon: Award,
        title: "Dubai Based",
        text: "Cosmalac Pvt Ltd is based in Dubai, United Arab Emirates.",
    },
];

const Trust = () => {
    return (
        <section className="trust section">
            <div className="container">
                <div className="trust__intro">
                    <div className="trust__eyebrow">
                        <Sparkles size={14} />
                        <span>Quality you can feel</span>
                    </div>

                    <h2>
                        Crafted with
                        <em> care.</em>
                        <br />
                        Made for confidence.
                    </h2>

                    <p>
                        Cosmalac brings together carefully selected
                        ingredients, professional manufacturing and
                        thoughtful skincare solutions designed for
                        modern beauty.
                    </p>
                </div>

                <div className="trust__grid">
                    {trustItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                className="trust__item"
                                key={item.title}
                            >
                                <div className="trust__icon">
                                    <Icon size={22} strokeWidth={1.5} />
                                </div>

                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="trust__statement">
                    <Gem size={18} />

                    <span>
            Premium skincare manufacturing from
            Dubai, UAE
          </span>

                    <div className="trust__line" />
                </div>
            </div>
        </section>
    );
};

export default Trust;