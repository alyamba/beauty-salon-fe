import React from 'react';
import './ProcedureCard.scss';
import editIcon from '../../resources/icons/edit.png';
import deleteIcon from '../../resources/icons/delete.png';
import Button from '../Button/Button';
import { LOCAL_STORAGE_KEYS } from '../../services/network';

const ProcedureCard = ({
  id,
  name,
  description,
  category,
  slotSize,
  price,
  editProcedure = () => {},
  deleteProcedure = () => {},
  chooseProcedure = () => {},
}) => {
  const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user));
  const isAuthorizedUser = !!userData?.id;
  const adminData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.admin));
  const isAdmin = !!adminData;
  return (
    <div className="card__container">
      <div className="card-title__conatiner">
        <div className="card-title-text__container">
          <p className="title">{name}</p>
          <p className="title">{price} BYN</p>
        </div>
        {isAdmin ? (
          <div className="card-management__container">
            <Button
              style="icon-btn"
              text={<img alt="edit" src={editIcon} className="icon" />}
              onPress={() => editProcedure(id)}
            />
            <Button
              style="icon-btn"
              text={<img alt="delete" src={deleteIcon} className="icon" />}
              onPress={() => deleteProcedure(id)}
            />
          </div>
        ) : isAuthorizedUser ? (
          <div className="card-management__container">
            <Button
              style="mainBtn"
              text="Оформить услугу"
              onPress={() => chooseProcedure(id)}
            />
          </div>
        ) : null}
      </div>
      <p className="category-text">{category.name}</p>
      <p className="text-about duration">Длительность: {slotSize} час</p>
      <p className="text-about">{description}</p>
    </div>
  );
};

export default ProcedureCard;
