export function PrivacyPage() {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </header>

      <div className="privacy-content container">
        <div className="privacy-content__inner content-width">
          <section id="affiliate">
            <h2>Amazon Affiliate Disclosure</h2>
            <p>
              Sugar Hijack is a participant in the Amazon Services LLC Associates Program,
              an affiliate advertising program designed to provide a means for sites to earn
              advertising fees by advertising and linking to Amazon.com.
            </p>
            <p>
              As an Amazon Associate, I earn from qualifying purchases. When you click on
              product links marked "(paid link)" and make a purchase, I may receive a small
              commission at no additional cost to you. This helps support the site and allows
              me to continue creating free educational content.
            </p>
          </section>

          <section id="health">
            <h2>Health Disclaimer</h2>
            <p>
              <strong>sugarhijack.com is for educational purposes only.</strong> The content
              on this site is not intended to be a substitute for professional medical advice,
              diagnosis, or treatment.
            </p>
            <p>
              Metabolic conditions including diabetes, prediabetes, insulin resistance, and
              metabolic syndrome require medical management by qualified healthcare professionals.
              Always seek the advice of your physician or other qualified health provider with
              any questions you may have regarding a medical condition.
            </p>
            <p>
              Never disregard professional medical advice or delay in seeking it because of
              something you have read on this website. Consult your healthcare provider before
              making significant dietary changes, starting a supplement regimen, or changing
              your exercise routine.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <p>
              This site does not collect personal information beyond standard web server logs
              (IP addresses, browser type, pages visited) which are used solely for site
              analytics and security purposes.
            </p>
            <p>
              We do not use cookies for tracking, advertising, or user profiling. We do not
              sell, trade, or transfer your information to third parties.
            </p>
          </section>

          <section>
            <h2>Third-Party Links</h2>
            <p>
              This site contains links to third-party websites, including Amazon.com. These
              sites have their own privacy policies and we have no responsibility for their
              content or practices. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For questions about this privacy policy, please visit{' '}
              <a href="https://theoraclelover.com" target="_blank" rel="noopener noreferrer">
                theoraclelover.com
              </a>.
            </p>
          </section>
        </div>
      </div>

      <style>{`
        .privacy-page { padding-bottom: var(--space-24); }
        .privacy-header {
          background: var(--color-text);
          padding: calc(var(--nav-height) + var(--space-12)) 0 var(--space-12);
        }
        .privacy-header h1 {
          font-family: var(--font-masthead);
          font-size: var(--text-3xl);
          color: var(--color-white);
          margin-bottom: var(--space-2);
        }
        .privacy-header p {
          color: rgba(253,250,244,0.5);
          font-size: var(--text-sm);
          margin: 0;
        }
        .privacy-content { padding: var(--space-16) 0; }
        .privacy-content__inner { padding: 0 var(--space-6); }
        .privacy-content section {
          margin-bottom: var(--space-12);
          padding-bottom: var(--space-12);
          border-bottom: 1px solid var(--color-border);
        }
        .privacy-content section:last-child { border-bottom: none; }
        .privacy-content h2 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-5);
        }
        .privacy-content p {
          font-size: var(--text-base);
          line-height: 1.75;
          color: var(--color-muted);
        }
      `}</style>
    </div>
  );
}
