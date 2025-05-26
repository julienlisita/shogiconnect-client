// src/pages/public/LegalNoticePage.jsx

import "../../markdown.css";
import PublicLayout from "../../layouts/PublicLayout";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PageTitle from "../../components/common/PageTitle";

export default function LegalNoticePage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/content/legal-notice.md")
      .then((res) => res.text())
      .then(setContent)
      .catch(console.error);
  }, []);

  return (
    <PublicLayout>
          <main className="main-without-banner markdown">
            <PageTitle>Mentions légales</PageTitle>
            <ReactMarkdown>{content}</ReactMarkdown>
          </main>
    </PublicLayout>
  );
}