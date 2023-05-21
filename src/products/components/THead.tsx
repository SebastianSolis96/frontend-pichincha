import InfoIcon from '../../assets/InfoIcon.svg';

export const THead = () => {
  return (
    <thead>
      <tr>
        <th>Logo</th>
        <th>Nombre del producto</th>
        <th>Descripción <img src={InfoIcon} className="logo" alt="Info logo" /></th>
        <th>Fecha de liberación <img src={InfoIcon} className="logo" alt="Info logo" /></th>
        <th>Fecha de reestructuración <img src={InfoIcon} className="logo" alt="Info logo" /></th>
        <th></th>
      </tr>
    </thead>
  );
};
