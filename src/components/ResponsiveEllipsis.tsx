import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

interface Props {
  text: string;
  maxLine: number;
}

const ResponsiveEllipsis = ({ text, maxLine }: Props) => {
  return (
    <LinesEllipsis
      text={text}
      maxLine={maxLine}
      ellipsis='...'
      basedOn='letters'
      trimRight
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
};

export default responsiveHOC()(ResponsiveEllipsis);
