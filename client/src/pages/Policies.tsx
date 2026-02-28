import React from "react";
import { Link } from "wouter";

export default function Policies() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* HERO */}
            <section className="border-b border-border">
                <div className="container mx-auto px-4 py-14 md:py-20">
                    <div className="max-w-4xl text-left">
                        <p className="font-heading uppercase tracking-wide text-accent">
                            Worldwide FC
                        </p>
                        <h1 className="font-heading mt-2 text-4xl md:text-6xl font-bold uppercase italic">
                            Club <span className="text-accent">Policies</span>
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-muted-foreground">
                            These policies exist to protect both the player and the club. To complete registration, players must sign and agree to these policies.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                            <Link href="/register">
                            </Link>
                        </div>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Questions? Email{" "}
                            <span className="text-foreground font-medium">
                                worldwide_info@worldwidefc.ca
                            </span>
                            .
                        </p>
                    </div>
                </div>
            </section>

            {/* POLICY CARDS */}
            <section id="policies" className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid gap-6 md:grid-cols-2">
                    <PolicyCard
                        title="Payment Policy"
                        items={[
                            <a
                                href="/payment-policy.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center mt-4 rounded-md bg-primary px-5 py-2.5 text-primary-foreground font-semibold hover:opacity-90 transition"
                            >
                                View Payment Policy (PDF)
                            </a>
                        ]}

                    />

                    <PolicyCard
                        title="Player Waiver & Code of Conduct"

                        items={[
                            <a
                                href="/player-waiver-code-of-conduct.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center mt-4 rounded-md bg-primary px-5 py-2.5 text-primary-foreground font-semibold hover:opacity-90 transition"
                            >
                                View Player Waiver & Code of Conduct (PDF)
                            </a>
                        ]}
                    />


                </div>

                {/* Footer note / last updated */}
                <div className="mt-10 rounded-lg border border-border bg-card p-6">
                    <h3 className="font-heading text-xl font-bold uppercase tracking-wide">
                        Enforcement & Updates
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                        Policies exist to protect the club and maintain a positive standard.
                        The club may update these rules as the program grows. Continued
                        participation indicates acceptance of the latest version.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Last updated: <span className="text-foreground font-medium">2026-02-28</span>
                        </p>
                        <Link href="/contact">
                            <a className="text-sm font-semibold text-accent hover:underline">
                                Contact us about policies →
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function PolicyCard({ title, items }: { title: string; items: React.ReactNode[] }) {
    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-accent">
                {title}
            </h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
                {items.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}