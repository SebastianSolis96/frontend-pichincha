import { FC } from 'react';

interface Props {
  title: string;
  action: () => void;
}

export const LightButton: FC<Props> = ({ title, action }) => {
  return (
    <button className="light-button"
      onClick={ () => action() }
    >
      { title }
    </button>
  );
};
