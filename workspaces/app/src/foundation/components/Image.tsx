import * as Unpic from '@unpic/react';

type Props = Unpic.ImageProps;

export const Image: React.FC<Props> = ({ ...rest }) => {
  return <Unpic.Image {...rest} />;
};
