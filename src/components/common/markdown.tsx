import React, { useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

import {
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import Prism from 'prismjs';
import '../../util/prismjsInit';
import '../../style/components/common/markdown.scss';

interface MyMarkdownProps {
  value: string;
  className?: string;
  isMain?: boolean;
}

function MyImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      style={{
        width: '100%',
        margin: '10px 0 10px 0',
      }}
      src={props.src}
      alt={props.alt}
    />
  );
}

function MyLink(props: { title: string; href: string; children: string }) {
  return (
    <Link title={props.title} href={props.href} target="_blank" className="my-link">
      {props.children}
    </Link>
  );
}

function EmptyHead(): JSX.Element {
  return (
    <Divider
      style={{
        margin: '0 0 9px 0',
      }}
    />
  );
}

function MyHead(props: TypographyProps) {
  return (
    <>
      <Typography
        style={{
          margin: `${props.variant !== 'h2' ? '30px' : '10px'} 0 0 10px`,
        }}
        id={String(props.children)}
        variant={props.variant}
      >
        {props.children}
      </Typography>
      <Divider
        style={{
          margin: '15px 0 15px 0',
        }}
      />
    </>
  );
}

function MyCode(props: { children: string; className?: string }) {
  if (props.className !== undefined) {
    return <code className={props.className}>{props.children}</code>;
  } else {
    return <span className="code-inline">{props.children}</span>;
  }
}

function MyPre(props: { children: string }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [props]);
  return (
    <div>
      <pre className="line-numbers">{props.children}</pre>
    </div>
  );
}

function MyListItem(props: { children: JSX.Element[] }) {
  return (
    <li>
      {props.children.map((value) => {
        return typeof value === 'string' ? (
          <Typography
            variant="body1"
            component="p"
            style={{
              margin: '6px 0 6px 0',
            }}
            key={value}
          >
            {value}
          </Typography>
        ) : (
          value
        );
      })}
    </li>
  );
}

function MyTable(props: { children: JSX.Element }) {
  return (
    <TableContainer
      component={Paper}
      style={{
        margin: '10px 5px 10px 5px',
        width: 'auto',
      }}
    >
      <Table>{props.children}</Table>
    </TableContainer>
  );
}

function MyBlockquote(props: { children: JSX.Element }) {
  return <blockquote className="my-blockquote">{props.children}</blockquote>;
}

export default function MyMarkdown(props: MyMarkdownProps): JSX.Element {
  const option: typeof Markdown.defaultProps.options = {
    overrides: {
      h1: props.isMain
        ? EmptyHead
        : {
            component: MyHead,
            props: {
              variant: 'h2',
            },
          },
      h2: {
        component: MyHead,
        props: {
          variant: 'h3',
        },
      },
      h3: {
        component: MyHead,
        props: {
          variant: 'h4',
        },
      },
      h4: {
        component: MyHead,
        props: {
          variant: 'h5',
        },
      },
      p: {
        component: Typography,
        props: {
          variant: 'body1',
        },
      },
      img: MyImage,
      a: MyLink,
      code: MyCode,
      pre: MyPre,
      li: MyListItem,
      table: MyTable,
      thead: TableHead,
      tr: TableRow,
      tbody: TableBody,
      td: TableCell,
      th: TableCell,
      hr: Divider,
      blockquote: MyBlockquote,
    },
  };
  return (
    <div className={`my-markdown ${props.className !== undefined ? props.className : ''}`}>
      <Markdown options={option}>{props.value}</Markdown>
    </div>
  );
}
