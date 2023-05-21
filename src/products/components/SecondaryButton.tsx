import { FC } from 'react';

interface Props {
  title: string;
  action: () => void;
}

export const SecondaryButton: FC<Props> = ({ title, action }) => {
  return (
    <button className="secondary-button"
      type="button" 
      onClick={ () => action() }
    >
      { title }
    </button>
  );
};
