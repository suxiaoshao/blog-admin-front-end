import React, { useEffect, useRef, useState } from 'react';
import '../../style/components/edit/markdownCode.scss';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const json = require('../../util/Monokai.json');
editor.defineTheme('mon', json);

interface MarkdownCodeProps {
  defaultValue: string;
  onChange: (newValue: string) => void;
}

export default function MarkdownCode(props: MarkdownCodeProps): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);
  const [myEditor, setEditor] = useState<IStandaloneCodeEditor | undefined>();
  useEffect(() => {
    setEditor(
      editor.create(divRef.current, {
        value: props.defaultValue,
        theme: 'mon',
        automaticLayout: true,
        language: 'markdown',
        fontFamily: 'jet mono',
        fontSize: 16,
        minimap: {
          enabled: false,
        },
      }),
    );
    return () => {
      myEditor?.dispose();
    };
  }, [divRef]);
  useEffect(() => {
    myEditor?.onKeyDown(() => {
      props.onChange(myEditor.getValue());
    });
  }, [myEditor]);
  return <div ref={divRef} className="markdown-code" />;
}
