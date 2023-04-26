import React from 'react';
import { Footer, Header, Table } from '../components';

const ProceduresPage = () => {
  const testObj = [
    {
      id: 0,
      name: 'Стрижка',
      description: 'Мужская стрижка, которая будет подобрана специально под вас!',
      category: {
        id: 0,
        name: 'Стрижка',
      },
      slotSize: 1,
      price: 100,
    },
    {
      id: 0,
      name: 'Массаж лица',
      description: 'Массаж лица поможет вам снять напряжение после тяжелого рабочего дня, разогнать отечность и сделать более свежий тон кожи',
      category: {
        id: 0,
        name: 'Массаж',
      },
      slotSize: 2,
      price: 200,
    },
    {
      id: 0,
      name: 'Гелевый маникюр',
      description: 'Долговременное покрытие, которое избавит вас от еженедельного беспокойства о своих ручках',
      category: {
        id: 0,
        name: 'Уход для ногтей',
      },
      slotSize: 1,
      price: 100,
    },
  ];

  return (
    <div>
      <Header />
      <main>
        <Table />
      </main>
      <Footer />
    </div>
  );
};

export default ProceduresPage;
