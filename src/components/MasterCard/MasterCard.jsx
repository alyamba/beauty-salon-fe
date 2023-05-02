import React from 'react';
import './MasterCard.scss';
import editIcon from '../../resources/icons/edit.png';
import deleteIcon from '../../resources/icons/delete.png';
import Button from '../Button/Button';
import { LOCAL_STORAGE_KEYS } from '../../services/network';
import moment from 'moment';

const MasterCard = ({
  id,
  name,
  procedures,
  slots,
  editMaster = () => {},
  deleteMaster = () => {},
}) => {
  const adminData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.admin));
  const isAdmin = !!adminData;
  return (
    <div className="master__container">
      <div className="master-title__conatiner">
        <div className="master-title-text__container">
          <p className="title">{name}</p>
        </div>
        {isAdmin ? (
          <div className="master-management__container">
            <Button
              style="icon-btn"
              text={<img alt="edit" src={editIcon} className="icon" />}
              onPress={() => editMaster(id)}
            />
            <Button
              style="icon-btn"
              text={<img alt="delete" src={deleteIcon} className="icon" />}
              onPress={() => deleteMaster(id)}
            />
          </div>
        ) : null}
      </div>
      <div className="procedures__container">
        <p className="title">Услуги: </p>
        {procedures.map((procedure) => (
          <p key={procedure.id} className="procedure-text">
            {procedure.name}
          </p>
        ))}
      </div>
      <p className='text-about title-time'>Свободные окошки: </p>
      {slots.map((slot) => (
        <p key={slot.id} className="text-about duration">
          {moment(slot.date).format('LLLL')}
        </p>
      ))}
    </div>
  );
};

export default MasterCard;
