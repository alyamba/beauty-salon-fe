import React, { useEffect, useState } from 'react';
import {
  Button,
  CategoryCard,
  Footer,
  Header,
  Input,
  Modal,
} from '../components';
import { CategoryService, LOCAL_STORAGE_KEYS } from '../services/network';
import sortIcon from '../resources/icons/sort.png';

const CategoriesPage = () => {
  const adminData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.admin));
  const isAdmin = !!adminData;

  const [newCategoryModalActive, setNewCategoryModalActive] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const [sortingOption, setSortingOption] = useState(null);
  const [sortedCategories, setSortedCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const categoriesData = await CategoryService.getAll();
      if (categoriesData) {
        setCategories(categoriesData);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const onClearCategoryStates = () => {
    setCategoryName('');
  };

  const onCreateNewCategory = async () => {
    try {
      await CategoryService.add(categoryName);
      setNewCategoryModalActive(false);
      window.location.reload(true);
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  const onCategoryCancelHandler = () => {
    if (window.confirm('Are you sure?')) {
      setCategoryName('');
      setNewCategoryModalActive(false);
    }
  };

  const handleOnSortCategories = () => {
    switch (sortingOption) {
      case null:
        setSortingOption('asc');
        setSortedCategories(
          categories.map((el) => el).sort((a, b) => (a.name > b.name ? 1 : -1)),
        );
        break;
      case 'asc':
        setSortingOption('desc');
        setSortedCategories(
          categories.map((el) => el).sort((a, b) => (a.name < b.name ? 1 : -1)),
        );
        break;
      case 'desc':
        setSortingOption(null);
        setSortedCategories([]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="category-contol__container">
          {isAdmin ? (
            <Button
              text="Новая категория"
              style="mainBtn"
              onPress={() => setNewCategoryModalActive(true)}
            />
          ) : null}
          <Button
            text={<img src={sortIcon} className="icon" />}
            style="icon-btn"
            onPress={handleOnSortCategories}
          />
        </div>
        <div className="categories__container">
          {sortingOption
            ? sortedCategories.map((category) => (
                <CategoryCard key={category.id} name={category.name} />
              ))
            : categories.map((category) => (
                <CategoryCard key={category.id} name={category.name} />
              ))}
        </div>
      </main>
      <Footer />

      <Modal
        active={newCategoryModalActive}
        setActive={setNewCategoryModalActive}
        onClearStates={onClearCategoryStates}
      >
        <h1>Новая категория</h1>
        <Input
          placeholder="Название категории"
          value={categoryName}
          type="text"
          setValue={(e) => setCategoryName(e.target.value)}
        />
        <div className="btns-container">
          <Button
            style="mainBtn"
            text="Сохранить"
            onPress={onCreateNewCategory}
          />
          <Button
            style="mainBtn"
            text="Выйти"
            onPress={onCategoryCancelHandler}
          />
        </div>
      </Modal>
    </div>
  );
};
export default CategoriesPage;
