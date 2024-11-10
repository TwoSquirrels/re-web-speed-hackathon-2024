import type * as CSS from 'csstype';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { apiClient } from '../../lib/api/apiClient';
import type { Color, Typography } from '../styles/variables';

const _Text = styled.span<{
  $color: string;
  $flexGrow?: CSS.Property.FlexGrow;
  $flexShrink?: CSS.Property.FlexShrink;
  $typography: string;
  $weight: string;
}>`
  ${({ $typography }) => $typography};
  color: ${({ $color }) => $color};
  flex-grow: ${({ $flexGrow }) => $flexGrow};
  flex-shrink: ${({ $flexShrink }) => $flexShrink};
  font-weight: ${({ $weight }) => $weight};
`;

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  color: Color;
  flexGrow?: CSS.Property.FlexGrow;
  flexShrink?: CSS.Property.FlexShrink;
  id?: string;
  src?: string | string[];
  typography: Typography;
  weight?: 'bold' | 'normal';
};

export const Text: React.FC<Props> = ({
  as,
  children,
  color,
  flexGrow,
  flexShrink,
  id,
  src,
  typography,
  weight = 'normal',
}) => {
  const [chunks, setChunks] = useState<{ id: string; Text: React.ReactNode }[]>(
    children ? [{ id: '', Text: children }] : [],
  );

  useEffect(() => {
    (async () => {
      if (!src) return;
      setChunks((prev) => prev.filter((chunk) => !chunk.id));
      for (const [i, source] of (Array.isArray(src) ? src : [src]).entries()) {
        const { data } = await apiClient.get(source);
        setChunks((prev) => {
          const next = [...prev];
          next[i] = { id: source, Text: data };
          return next;
        });
      }
    })().catch(console.error);
  }, [src]);

  return (
    <_Text
      $color={color}
      $flexGrow={flexGrow}
      $flexShrink={flexShrink}
      $typography={typography}
      $weight={weight}
      as={as}
      id={id}
    >
      {chunks.map(({ id, Text }) => (
        <React.Fragment key={id}>{Text}</React.Fragment>
      ))}
    </_Text>
  );
};
