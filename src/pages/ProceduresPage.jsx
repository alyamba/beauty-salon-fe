import React from 'react';
import { Button, Footer, Header, Input, ProcedureCard } from '../components';
import { LOCAL_STORAGE_KEYS } from '../services/network';
import sortIcon from '../resources/icons/sort.png';

const ProceduresPage = () => {
  const testObj = [
    {
      id: 0,
      name: 'Стрижка',
      description:
        'Мужская стрижка, которая будет подобрана специально под вас!',
      category: {
        id: 0,
        name: 'Стрижка',
      },
      slotSize: 1,
      price: 100,
    },
    {
      id: 1,
      name: 'Массаж лица',
      description:
        'Массаж лица поможет вам снять напряжение после тяжелого рабочего дня, разогнать отечность и сделать более свежий тон кожи',
      category: {
        id: 0,
        name: 'Массаж',
      },
      slotSize: 2,
      price: 200,
    },
    {
      id: 2,
      name: 'Гелевый маникюр',
      description:
        'Долговременное покрытие, которое избавит вас от еженедельного беспокойства о своих ручках',
      category: {
        id: 0,
        name: 'Уход для ногтей',
      },
      slotSize: 1,
      price: 100,
    },
  ];

  const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user));
  const isAuthorizedUser = !!userData?.id;
  const adminData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.admin));
  const isAdmin = !!adminData;

  const createNewProcedure = () => {};
  const sortProcedure = () => {};

  return (
    <div>
      <Header />
      <main>
        <div className="procedure-contol__container">
          {isAdmin ? (
            <Button
              text="Новая процедура"
              style="mainBtn"
              onPress={createNewProcedure}
            />
          ) : null}
          <Input placeholder="Поиск" />
          <Button
            text={<img src={sortIcon} className="icon" />}
            style="icon-btn"
            onPress={sortProcedure}
          />
        </div>
        {testObj.map((procedure) => (
          <ProcedureCard
            key={procedure.id}
            name={procedure.name}
            description={procedure.description}
            category={procedure.category}
            slotSize={procedure.slotSize}
            price={procedure.price}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default ProceduresPage;
