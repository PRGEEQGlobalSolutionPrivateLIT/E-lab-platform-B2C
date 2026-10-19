'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
} from 'next/navigation';

/* =========================================================
   REACT PREVIEW PAGE

   Current URL example:

   http://localhost:3000/preview/react/react-counter

   Flow:

   Workspace Run
        ↓
   previewHtml
        ↓
   localStorage:
   elab_react_preview_react-counter
        ↓
   This page
        ↓
   sandboxed iframe
        ↓
   Interactive React application
========================================================= */

export default function ReactPreviewPage() {
  const params =
    useParams<{
      previewId: string;
    }>();

  const previewId =
    params.previewId;

  /* =======================================================
     STATE
  ======================================================= */

  const [
    previewHtml,
    setPreviewHtml,
  ] = useState<
    string | null
  >(
    null,
  );

  const [
    loading,
    setLoading,
  ] = useState(
    true,
  );

  /* =======================================================
     LOAD PREVIEW FROM LOCAL STORAGE
  ======================================================= */

  useEffect(
    () => {
      if (
        !previewId
      ) {
        setPreviewHtml(
          null,
        );

        setLoading(
          false,
        );

        return;
      }

      try {
        const storageKey =
          `elab_react_preview_${previewId}`;

        const stored =
          window.localStorage.getItem(
            storageKey,
          );

        setPreviewHtml(
          stored,
        );
      } catch (
        error
      ) {
        console.error(
          'Unable to load React preview:',
          error,
        );

        setPreviewHtml(
          null,
        );
      } finally {
        setLoading(
          false,
        );
      }
    },
    [
      previewId,
    ],
  );

  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading
  ) {
    return (
      <main
        style={{
          width:
            '100vw',

          height:
            '100vh',

          display:
            'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          margin:
            0,

          padding:
            0,

          background:
            '#ffffff',

          color:
            '#111827',

          fontFamily:
            'Segoe UI, Arial, sans-serif',
        }}
      >
        <div
          style={{
            textAlign:
              'center',
          }}
        >
          <h2
            style={{
              margin:
                0,

              fontSize:
                '20px',
            }}
          >
            Loading Preview...
          </h2>
        </div>
      </main>
    );
  }

  /* =======================================================
     PREVIEW NOT FOUND
  ======================================================= */

  if (
    !previewHtml
  ) {
    return (
      <main
        style={{
          width:
            '100vw',

          height:
            '100vh',

          display:
            'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          margin:
            0,

          padding:
            0,

          background:
            '#ffffff',

          color:
            '#111827',

          fontFamily:
            'Segoe UI, Arial, sans-serif',
        }}
      >
        <div
          style={{
            maxWidth:
              '440px',

            padding:
              '32px',

            textAlign:
              'center',
          }}
        >
          <h1
            style={{
              marginTop:
                0,

              marginBottom:
                '12px',

              fontSize:
                '24px',
            }}
          >
            Preview unavailable
          </h1>

          <p
            style={{
              margin:
                0,

              lineHeight:
                1.6,

              color:
                '#6b7280',
            }}
          >
            Run the React problem again
            from the eLab workspace to
            generate a new web preview.
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     REACT WEB PREVIEW

     Important:

     Do NOT add:
     allow-same-origin

     Learner code must remain isolated from
     the parent eLab application.
  ======================================================= */

  return (
    <main
      style={{
        width:
          '100vw',

        height:
          '100vh',

        margin:
          0,

        padding:
          0,

        overflow:
          'hidden',

        background:
          '#ffffff',
      }}
    >
      <iframe
        title={`eLab React Preview - ${previewId}`}
        srcDoc={
          previewHtml
        }
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
        style={{
          width:
            '100%',

          height:
            '100%',

          border:
            0,

          margin:
            0,

          padding:
            0,

          display:
            'block',

          background:
            '#ffffff',
        }}
      />
    </main>
  );
}