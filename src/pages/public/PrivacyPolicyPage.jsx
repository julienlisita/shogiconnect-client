// src/pages/public/PrivacyPolicyPage.jsx

import "../../markdown.css";
import PublicLayout from "../../layouts/PublicLayout";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PageTitle from "../../components/common/PageTitle";

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/content/privacy-policy.md")
      .then((res) => res.text())
      .then(setContent)
      .catch(console.error);
  }, []);

  return (
    <PublicLayout>
      <main className="main-without-banner markdown">
        <PageTitle>Politique de confidentialité</PageTitle>
        <ReactMarkdown>{content}</ReactMarkdown>
      </main>
    </PublicLayout>
  );
}