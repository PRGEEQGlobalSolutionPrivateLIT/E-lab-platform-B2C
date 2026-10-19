'use client';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useParams,
} from 'next/navigation';

/* =========================================================
   HTML / CSS WEB PREVIEW PAGE

   Route:
   /preview/web/[previewId]

   The workspace writes rendered HTML to:

   elab_web_preview_<previewId>

   This page only displays the preview in a sandboxed iframe.
========================================================= */

export default function WebPreviewPage() {
  const params =
    useParams<{
      previewId: string;
    }>();

  const previewId =
    params.previewId;

  const storageKey =
    useMemo(
      () =>
        `elab_web_preview_${previewId}`,
      [
        previewId,
      ],
    );

  const [
    previewHtml,
    setPreviewHtml,
  ] = useState(
    '',
  );

  const [
    isReady,
    setIsReady,
  ] = useState(
    false,
  );

  useEffect(
    () => {
      const loadPreview =
        () => {
          const stored =
            window.localStorage.getItem(
              storageKey,
            );

          setPreviewHtml(
            stored ??
            '',
          );

          setIsReady(
            true,
          );
        };

      loadPreview();

      const handleStorage =
        (
          event:
            StorageEvent,
        ) => {
          if (
            event.key !==
            storageKey
          ) {
            return;
          }

          setPreviewHtml(
            event.newValue ??
            '',
          );
        };

      const handleFocus =
        () => {
          loadPreview();
        };

      window.addEventListener(
        'storage',
        handleStorage,
      );

      window.addEventListener(
        'focus',
        handleFocus,
      );

      return () => {
        window.removeEventListener(
          'storage',
          handleStorage,
        );

        window.removeEventListener(
          'focus',
          handleFocus,
        );
      };
    },
    [
      storageKey,
    ],
  );

  if (
    !isReady
  ) {
    return (
      <main
        style={{
          minHeight:
            '100vh',

          display:
            'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          margin:
            0,

          background:
            '#ffffff',

          color:
            '#475569',

          fontFamily:
            '"Segoe UI", Inter, sans-serif',
        }}
      >
        Loading preview...
      </main>
    );
  }

  if (
    !previewHtml
  ) {
    return (
      <main
        style={{
          minHeight:
            '100vh',

          display:
            'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          padding:
            '24px',

          margin:
            0,

          background:
            '#ffffff',

          color:
            '#475569',

          fontFamily:
            '"Segoe UI", Inter, sans-serif',

          textAlign:
            'center',
        }}
      >
        Preview not found. Return to the eLab workspace and click Run.
      </main>
    );
  }

  return (
    <iframe
      title="HTML and CSS Preview"
      sandbox=""
      srcDoc={
        previewHtml
      }
      style={{
        position:
          'fixed',

        inset:
          0,

        width:
          '100vw',

        height:
          '100vh',

        border:
          0,

        margin:
          0,

        padding:
          0,

        background:
          '#ffffff',
      }}
    />
  );
}