import React, { useEffect, useState } from 'react';
import { Button, Footer, Header, Input, ProcedureCard } from '../components';
import {
  CategoryService,
  LOCAL_STORAGE_KEYS,
  ProcedureService,
} from '../services/network';
import sortIcon from '../resources/icons/sort.png';

const ProceduresPage = () => {
  const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user));
  const isAuthorizedUser = !!userData?.id;
  const adminData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.admin));
  const isAdmin = !!adminData;

  const [categories, setCategories] = useState([]);
  const [openedCategories, setOpenedCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getAllCategory = async () => {
    try {
      console.log('PRESSED: ', process.env.NODE_ENV);
      const categoryData = await CategoryService.getAllCategory();
      console.log(categoryData);
      if (categoryData) {
        setCategories(categoryData);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getProceduresByCategory = async (category) => {
    try {
      const proceduresData = await ProcedureService.getAllByCategory(
        category.id,
        category.name,
      );
      console.log(proceduresData);
      if (proceduresData) {
        setCategories((old) =>
          old.reduce((res, item) => {
            if (item.id === category.id) {
              return [...res, { ...item, proceduresList: proceduresData }];
            }
            return [...res, item];
          }, []),
        );
      }
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  const handleOnCategoryPress = (category) => {
    if (openedCategories.find((el) => el === category.id)) {
      setOpenedCategories((old) => old.filter((el) => el !== category.id));
    } else {
      if (!category.proceduresList) {
        getProceduresByCategory(category);
      }
      setOpenedCategories((old) => [...old, category.id]);
    }
  };

  const createNewProcedure = () => {};
  const sortProcedure = () => {};
  const searchProcedure = () => {};

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
          <Input
            placeholder="Поиск по категории"
            setValue={searchProcedure}
            value={searchValue}
            style="searching-input"
          />
          <Input
            placeholder="Поиск процедуры"
            setValue={searchProcedure}
            value={searchValue}
            style="searching-input"
          />
          <Button
            text={<img src={sortIcon} className="icon" />}
            style="icon-btn"
            onPress={sortProcedure}
          />
        </div>
        <div>
          {categories.map((category) => (
            <div key={category.id}>
              <div
                className="category-list"
                onClick={() => handleOnCategoryPress(category)}
              >
                {category.name.toUpperCase()}
              </div>
              {category.proceduresList &&
              !!openedCategories.find((el) => el === category.id)
                ? category.proceduresList.map((procedure) => (
                    <ProcedureCard
                      key={procedure.id}
                      name={procedure.name}
                      description={procedure.description}
                      category={procedure.category}
                      slotSize={procedure.slotSize}
                      price={procedure.price}
                    />
                  ))
                : null}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProceduresPage;
