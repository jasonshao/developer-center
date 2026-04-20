import { useState } from "react";
import { Icons } from "./icons";

export type CodeToken = { t: "k" | "s" | "n" | "c" | "p" | "f" | "v" | "key"; v: string };

type Props = {
  tabs?: string[];
  lang?: string;
  code: CodeToken[];
};

export function CodeBlock({ tabs = ["curl"], lang = "bash", code }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [copied, setCopied] = useState(false);
  const raw = code.map((t) => t.v).join("");

  const onCopy = () => {
    navigator.clipboard?.writeText(raw).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="codeblock">
      <div className="cb-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={`cb-tab ${t === activeTab ? "is-active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
        <div className="cb-spacer" />
        <span className="cb-lang">{lang}</span>
        <button className="cb-copy" onClick={onCopy}>
          {copied ? <Icons.Check size={11} stroke={2} /> : <Icons.Copy size={11} stroke={1.7} />}
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <pre>
        <code>
          {code.map((t, i) => (
            <span key={i} className={`tk-${t.t}`}>
              {t.v}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
