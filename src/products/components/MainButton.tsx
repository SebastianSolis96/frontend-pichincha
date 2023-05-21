import { FC } from 'react';

interface Props {
  title: string;
  action: () => void;
  disabled ?: boolean;
}

export const MainButton: FC<Props> = ({ title, action, disabled }) => {
  return (
    <button className={disabled ? `main-button disabled-button` : `main-button`}
      disabled = { disabled }
      type="button"
      onClick={ () => action() }
    >
      { title }
    </button>
  );
};
