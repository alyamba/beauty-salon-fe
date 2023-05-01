import React, { useEffect, useState } from 'react';
import {
  Button,
  Footer,
  Header,
  Input,
  Modal,
  ProcedureCard,
  TextArea,
} from '../components';
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

  const [newProcedureModalActive, setNewProcedureModalActive] = useState(false);
  const [editProcedureModalActive, setEditProcedureModalActive] =
    useState(false);
  const [editingProcedureId, setEditingProcedureId] = useState(null);
  const [procedureName, setProcedureName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({});
  const [slotSize, setSlotSize] = useState('');
  const [price, setPrice] = useState('');

  const getAllCategory = async () => {
    try {
      const categoryData = await CategoryService.getAllCategory();
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

  const onClearNotesStates = () => {
    setProcedureName('');
    setDescription('');
    setSlotSize('');
    setPrice('');
  };

  const onCreateNewProcedure = async () => {
    try {
      const category = categories.find((el) => el.id === +selectedCategory);
      await ProcedureService.add(
        procedureName,
        description,
        { name: category.name, id: category.id },
        +slotSize,
        +price,
      );
      setNewProcedureModalActive(false);
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };
  const onEditProcedure = (procedureId, categoryId) => {
    const procedure = categories
      .find((el) => el.id === categoryId)
      .proceduresList.find((el) => el.id === procedureId);
    setProcedureName(procedure.name);
    setDescription(procedure.description);
    setSelectedCategory(categoryId);
    setSlotSize(procedure.slotSize);
    setPrice(procedure.price);
    setEditProcedureModalActive(true);
    setEditingProcedureId(procedureId);
  };
  const onSaveEditProcedure = async () => {
    try {
      const category = categories.find((el) => el.id === +selectedCategory);
      await ProcedureService.editProcedure(
        editingProcedureId,
        procedureName,
        description,
        { name: category.name, id: category.id },
        +slotSize,
        +price,
      );
      const existingProcedure = category.proceduresList.find(
        (el) => el.id === editingProcedureId,
      );
      if (existingProcedure) {
        setCategories((old) =>
          old.reduce((res, item) => {
            if (item.id === +selectedCategory) {
              const newProceduresList = item.proceduresList.reduce(
                (procedureRes, procedureItem) => {
                  if (procedureItem.id === editingProcedureId) {
                    return [
                      ...procedureRes,
                      {
                        ...procedureItem,
                        name: procedureName,
                        description,
                        slotSize,
                        price,
                        selectedCategory: {
                          name: category.name,
                          id: category.id,
                        },
                      },
                    ];
                  }
                  return [...procedureRes, procedureItem];
                },
                [],
              );
              return [...res, { ...item, proceduresList: newProceduresList }];
            }
            return [...res, item];
          }, []),
        );
      }
      setEditProcedureModalActive(false);
      setEditingProcedureId(null);
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };
  const onDeleteProcedure = async (procedureId, categoryId) => {
    try {
      const procedure = categories
        .find((el) => el.id === categoryId)
        .proceduresList.find((el) => el.id === procedureId);
      await ProcedureService.deleteProcedure(procedure);
      setCategories((old) =>
        old.reduce((res, item) => {
          if (item.id === categoryId) {
            const newProceduresList = item.proceduresList.reduce(
              (procedureRes, procedureItem) => {
                if (procedureItem.id === procedureId) {
                  return [...procedureRes];
                }
                return [...procedureRes, procedureItem];
              },
              [],
            );
            return [...res, { ...item, proceduresList: newProceduresList }];
          }
          return [...res, item];
        }, []),
      );
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };
  const sortProcedure = () => {};
  const searchProcedure = () => {};
  const onProcedureCancelHandler = () => {
    if (window.confirm('Are you sure?')) {
      setProcedureName('');
      setDescription('');
      setSlotSize('');
      setPrice('');
      setSelectedCategory({});
      setNewProcedureModalActive(false);
      setEditProcedureModalActive(false);
      setEditingProcedureId(null);
    }
  };
  const handleSetEditingModalActiveStatus = (status) => {
    setEditProcedureModalActive(status);
    setEditingProcedureId(null);
  };

  return (
    <div>
      <Header />
      <main>
        <div className="procedure-contol__container">
          {isAdmin ? (
            <Button
              text="Новая процедура"
              style="mainBtn"
              onPress={() => setNewProcedureModalActive(true)}
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
                      id={procedure.id}
                      key={procedure.id}
                      name={procedure.name}
                      description={procedure.description}
                      category={procedure.category}
                      slotSize={procedure.slotSize}
                      price={procedure.price}
                      editProcedure={(id) => onEditProcedure(id, category.id)}
                      deleteProcedure={(id) =>
                        onDeleteProcedure(id, category.id)
                      }
                    />
                  ))
                : null}
            </div>
          ))}
        </div>
      </main>
      <Footer />

      <Modal
        active={newProcedureModalActive}
        setActive={setNewProcedureModalActive}
        onClearStates={onClearNotesStates}
      >
        <h1>Новая процедура</h1>
        <Input
          placeholder="Название"
          value={procedureName}
          type="text"
          setValue={(e) => setProcedureName(e.target.value)}
        />
        <TextArea
          placeholder="Описание"
          value={description}
          style="form__input"
          setValue={(e) => setDescription(e.target.value)}
        />
        <select
          name="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Выберите категорию
          </option>
          {categories.map((catogory) => (
            <option value={catogory.id} key={catogory.id}>
              {catogory.name}
            </option>
          ))}
        </select>
        <Input
          placeholder="Длительность"
          value={slotSize}
          type="text"
          setValue={(e) => setSlotSize(e.target.value)}
        />
        <Input
          placeholder="Цена"
          value={price}
          type="text"
          setValue={(e) => setPrice(e.target.value)}
        />
        <div className="btns-container">
          <Button
            style="mainBtn"
            text="Сохранить"
            onPress={onCreateNewProcedure}
          />
          <Button
            style="mainBtn"
            text="Выйти"
            onPress={onProcedureCancelHandler}
          />
        </div>
      </Modal>

      <Modal
        active={editProcedureModalActive}
        setActive={handleSetEditingModalActiveStatus}
        onClearStates={onClearNotesStates}
      >
        <h1>Редактирование процедуры</h1>
        <Input
          placeholder="Название"
          value={procedureName}
          type="text"
          setValue={(e) => setProcedureName(e.target.value)}
        />
        <TextArea
          placeholder="Описание"
          value={description}
          style="form__input"
          setValue={(e) => setDescription(e.target.value)}
        />
        <select
          name="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Выберите категорию
          </option>
          {categories.map((catogory) => (
            <option value={catogory.id} key={catogory.id}>
              {catogory.name}
            </option>
          ))}
        </select>
        <Input
          placeholder="Длительность"
          value={slotSize}
          type="text"
          setValue={(e) => setSlotSize(e.target.value)}
        />
        <Input
          placeholder="Цена"
          value={price}
          type="text"
          setValue={(e) => setPrice(e.target.value)}
        />
        <div className="btns-container">
          <Button
            style="mainBtn"
            text="Сохранить"
            onPress={onSaveEditProcedure}
          />
          <Button
            style="mainBtn"
            text="Выйти"
            onPress={onProcedureCancelHandler}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProceduresPage;
