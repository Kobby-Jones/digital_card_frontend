export function buildVCard(opts: { name: string; title?: string; email?: string; phone?: string; org?: string; url?: string }) {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${opts.name};`,
      `FN:${opts.name}`,
      opts.title ? `TITLE:${opts.title}` : "",
      opts.org ? `ORG:${opts.org}` : "",
      opts.phone ? `TEL;TYPE=CELL:${opts.phone}` : "",
      opts.email ? `EMAIL;TYPE=INTERNET:${opts.email}` : "",
      opts.url ? `URL:${opts.url}` : "",
      "END:VCARD"
    ].filter(Boolean).join("\n");
    return new Blob([lines], { type: "text/vcard" });
  }
  