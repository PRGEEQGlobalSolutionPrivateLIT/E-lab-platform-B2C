/* =========================================================
   WEB PREVIEW BUILDER

   Used by workspaceType = 'web'.

   Current support:
   - HTML
   - CSS
   - Multiple CSS files

   No JavaScript execution is enabled in Step 3.
========================================================= */

type WebPreviewFile = {
  path: string;

  language: string;

  content: string;
};

/* =========================================================
   LOCAL STYLESHEET LINK

   When style.css is already linked from index.html, the
   browser preview cannot fetch that virtual file directly.

   We remove local CSS links because the CSS is injected
   below as an inline <style> block.
========================================================= */

function removeLocalStylesheetLinks(
  html: string,
) {
  return html.replace(
    /<link\b(?=[^>]*\brel\s*=\s*["']stylesheet["'])(?=[^>]*\bhref\s*=\s*["'](?!https?:\/\/|\/\/|data:)[^"']+["'])[^>]*>/gi,
    '',
  );
}

/* =========================================================
   INJECT INTO HEAD
========================================================= */

function injectIntoHead(
  html: string,
  content: string,
) {
  if (
    /<\/head\s*>/i.test(
      html,
    )
  ) {
    return html.replace(
      /<\/head\s*>/i,
      `${content}\n</head>`,
    );
  }

  if (
    /<html\b[^>]*>/i.test(
      html,
    )
  ) {
    return html.replace(
      /<html\b[^>]*>/i,
      (
        match,
      ) =>
        `${match}\n<head>\n${content}\n</head>`,
    );
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
${content}
</head>
<body>
${html}
</body>
</html>`;
}

/* =========================================================
   BUILD WEB PREVIEW
========================================================= */

export function buildWebPreview(
  files: WebPreviewFile[],
) {
  const htmlFile =
    files.find(
      (
        file,
      ) =>
        file.path
          .toLowerCase() ===
        'index.html',
    ) ??
    files.find(
      (
        file,
      ) =>
        file.language ===
        'html',
    );

  const html =
    htmlFile
      ?.content ??
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Web Preview</title>
</head>

<body>
</body>
</html>`;

  const css =
    files
      .filter(
        (
          file,
        ) =>
          file.language ===
            'css' ||
          file.path
            .toLowerCase()
            .endsWith(
              '.css',
            ),
      )
      .map(
        (
          file,
        ) =>
          `/* ${file.path} */\n${file.content}`,
      )
      .join(
        '\n\n',
      );

  const normalizedHtml =
    removeLocalStylesheetLinks(
      html,
    );

  /*
   * Strict preview policy:
   *
   * - no scripts
   * - no frames
   * - no network requests
   * - inline CSS allowed
   * - data/blob images allowed
   */
  const securityMeta =
    `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; form-action 'none'; base-uri 'none'; frame-src 'none';">`;

  const styles =
    css.trim()
      ? `<style>\n${css}\n</style>`
      : '';

  return injectIntoHead(
    normalizedHtml,
    [
      securityMeta,
      styles,
    ]
      .filter(
        Boolean,
      )
      .join(
        '\n',
      ),
  );
}
