"use client";

import { useState } from "react";

const DISPUTE_TYPES = [
  "Security deposit not returned",
  "Unpaid invoice or freelance work",
  "Property damage",
  "Breach of contract",
  "Defective product or service",
  "Loan or money owed",
  "Other",
];

export default function Home() {
  const [form, setForm] = useState({
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientAddress: "",
    disputeType: "",
    amount: "",
    description: "",
    deadline: "14",
  });
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const canSubmit =
    form.senderName &&
    form.recipientName &&
    form.disputeType &&
    form.amount &&
    form.description;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLetter("");
    setCopied(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate letter");
      }

      const data = await res.json();
      setLetter(data.letter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <header>
        <h1>Demand Letter Generator</h1>
        <p>Create a professional demand letter in minutes — free.</p>
      </header>

      <main className="container">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-section-title">Your Information</div>
          <div className="field">
            <label htmlFor="senderName">Full Name</label>
            <input
              id="senderName"
              value={form.senderName}
              onChange={update("senderName")}
              placeholder="Jane Smith"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="senderAddress">Mailing Address (optional)</label>
            <input
              id="senderAddress"
              value={form.senderAddress}
              onChange={update("senderAddress")}
              placeholder="123 Main St, City, State ZIP"
            />
          </div>

          <div className="form-section-title">Recipient Information</div>
          <div className="field">
            <label htmlFor="recipientName">
              Recipient Name (person or company)
            </label>
            <input
              id="recipientName"
              value={form.recipientName}
              onChange={update("recipientName")}
              placeholder="ABC Property Management LLC"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="recipientAddress">
              Recipient Address (optional)
            </label>
            <input
              id="recipientAddress"
              value={form.recipientAddress}
              onChange={update("recipientAddress")}
              placeholder="456 Oak Ave, City, State ZIP"
            />
          </div>

          <div className="form-section-title">Dispute Details</div>
          <div className="row">
            <div className="field">
              <label htmlFor="disputeType">Type of Dispute</label>
              <select
                id="disputeType"
                value={form.disputeType}
                onChange={update("disputeType")}
                required
              >
                <option value="">Select...</option>
                {DISPUTE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="amount">Amount Owed ($)</label>
              <input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                value={form.amount}
                onChange={update("amount")}
                placeholder="1500.00"
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="description">
              Describe what happened (be specific)
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={update("description")}
              placeholder="I moved out of my apartment at 123 Main St on January 15, 2025. My landlord has not returned my $1,500 security deposit despite the unit being left in good condition with no damages."
              required
            />
          </div>
          <div className="field">
            <label htmlFor="deadline">Response Deadline (days)</label>
            <select
              id="deadline"
              value={form.deadline}
              onChange={update("deadline")}
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>

          <button className="btn-primary" type="submit" disabled={!canSubmit || loading}>
            {loading ? "Generating your letter..." : "Generate Demand Letter"}
          </button>

          {error && <div className="error-msg">{error}</div>}
        </form>

        {letter && (
          <div className="result-card">
            <h2>Your Demand Letter</h2>
            <div className="letter-output">{letter}</div>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? "\u2713 Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        )}

        <section className="seo-section">
          <h2>What Is a Demand Letter?</h2>
          <p>
            A demand letter is a formal written notice sent to a person or
            business that owes you money or has failed to meet an obligation. It
            outlines the dispute, the amount owed, and a deadline to resolve the
            matter — typically before you take legal action in small claims court.
          </p>

          <h3>When Should You Send a Demand Letter?</h3>
          <p>
            You should send a demand letter when someone owes you money and
            informal requests haven&apos;t worked. Common situations include
            unreturned security deposits, unpaid freelance invoices, property
            damage, loan repayment, breach of contract, or defective products and
            services. Many small claims courts actually require you to send a
            demand letter before filing a case.
          </p>

          <h3>Do Demand Letters Work?</h3>
          <p>
            Yes — most disputes are resolved after a demand letter is sent. A
            well-written demand letter shows the recipient you&apos;re serious
            and prepared to escalate. It puts them on notice, creates a paper
            trail, and often leads to a settlement without ever going to court.
          </p>

          <h3>Do I Need a Lawyer to Write a Demand Letter?</h3>
          <p>
            No. You can write and send a demand letter yourself. While hiring a
            lawyer adds weight, a clear, professional letter is effective on its
            own. Our free generator helps you create one in minutes with the
            right tone, structure, and legal language.
          </p>
        </section>
      </main>

      <footer>
        <p>
          This tool generates letters for informational purposes only and does
          not constitute legal advice. Consult an attorney for specific legal
          questions.
        </p>
        <p style={{ marginTop: 4 }}>
          \u00a9 {new Date().getFullYear()} demandlettergenerator.org
        </p>
      </footer>
    </>
  );
}
