import React from 'react';

const OrderCard = (master, date, procedure) => {
  return (
    <div className="order__container">
      <div className="info-about-procedure">
        <p className="title">{procedure.name}</p>
        <p className="duration">{procedure.slotSize}</p>
        <p className>{procedure.description}</p>
      </div>
      <div className="info-about-master">
        <p>{master.name}</p>
      </div>
      <div className="date-info">{date}</div>
    </div>
  );
};

export default OrderCard;
