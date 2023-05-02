import React, { useLayoutEffect, useState } from 'react';
import {
  Button,
  CheckboxRaw,
  Footer,
  Header,
  Input,
  MasterCard,
  Modal,
} from '../components';
import {
  LOCAL_STORAGE_KEYS,
  MasterService,
  ProcedureService,
  SlotService,
} from '../services/network';
import moment from 'moment/moment';

const MastersPage = () => {
  const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user));
  const isAuthorizedUser = !!userData?.id;
  const adminData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.admin));
  const isAdmin = !!adminData;

  const [masters, setMasters] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [slots, setSlots] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [searchedMasters, setSearchedMasters] = useState([]);

  const [newMasterModalActive, setNewMasterModalActive] = useState(false);
  const [editMasterModalActive, setEditMasterModalActive] = useState(false);
  const [editingMasterId, setEditingMasterId] = useState(null);
  const [masterName, setMasterName] = useState('');
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const getAllDataForMasterCreation = async () => {
    try {
      const proceduresData = await ProcedureService.getAll();
      const timeSlotsData = await SlotService.getAll();
      if (proceduresData) {
        setProcedures(proceduresData);
      }
      if (timeSlotsData) {
        setSlots(timeSlotsData);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  const getAllMaster = async () => {
    try {
      const mastersData = await MasterService.getAll();
      if (mastersData) {
        setMasters(mastersData);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };
  useLayoutEffect(() => {
    getAllDataForMasterCreation();
    getAllMaster();
  }, []);

  const handleOnChangeProcedureCheckbox = (procedureId) => {
    setSelectedProcedures((old) =>
      old.find((el) => el.id === procedureId)
        ? old.filter((el) => el.id !== procedureId)
        : [...old, procedures.find((el) => el.id === procedureId)],
    );
  };

  const handleOnChangeTimeSlotCheckbox = (timeSlotId) => {
    setSelectedTimeSlots((old) =>
      old.find((el) => el.id === timeSlotId)
        ? old.filter((el) => el.id !== timeSlotId)
        : [...old, slots.find((el) => el.id === timeSlotId)],
    );
  };

  const onClearMastersStates = () => {
    setMasterName('');
    setSelectedProcedures([]);
    setSelectedTimeSlots([]);
    setNewMasterModalActive(false);
    setEditMasterModalActive(false);
    setEditingMasterId(null);
  };

  const onCreateNewMaster = async () => {
    try {
      await MasterService.add(
        masterName,
        selectedProcedures,
        selectedTimeSlots,
      );
      onClearMastersStates();
      window.location.reload(true);
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  const onMasterCancelHandler = () => {
    if (window.confirm('Are you sure?')) {
      onClearMastersStates();
    }
  };

  const onDeleteMaster = async (masterId) => {
    try {
      const masterData = masters.find((el) => el.id === masterId);
      await MasterService.deleteMaster(masterData);
      setMasters((old) => old.filter((el) => el.id !== masterId));
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  const onEditMaster = (masterId) => {
    const masterData = masters.find((el) => el.id === masterId);
    setEditingMasterId(masterId);
    setEditMasterModalActive(true);
    setMasterName(masterData.name);
    setSelectedProcedures(masterData.procedures);
    setSelectedTimeSlots(masterData.slots);
  };

  const onSaveEditingMaster = async () => {
    try {
      await MasterService.editMaster(
        editingMasterId,
        masterName,
        selectedProcedures,
        selectedTimeSlots,
      );
      onClearMastersStates();
      setMasters((old) =>
        old.reduce((res, item) => {
          if (item.id === editingMasterId) {
            return [
              ...res,
              {
                ...item,
                name: masterName,
                procedures: selectedProcedures,
                slots: selectedTimeSlots,
              },
            ];
          }
          return [...res, item];
        }, []),
      );
    } catch (error) {
      console.log('ERROR: ', error);
      // errorHandler(error)
    }
  };

  const onSearch = (value) => {
    console.log('vaL: ', value);
    setSearchValue(value);
    if (value) {
      setSearchedMasters((old) =>
        masters.filter((el) => el.name.toLowerCase().includes(value.toLowerCase())),
      );
    } else {
      setSearchedMasters([]);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="master-contol__container">
          {isAdmin ? (
            <Button
              text="Новый мастер"
              style="mainBtn"
              onPress={() => setNewMasterModalActive(true)}
            />
          ) : null}
          <Input
            placeholder="Поиск по имени"
            style="searching-input"
            setValue={(e) => onSearch(e.target.value)}
            value={searchValue}
          />
        </div>
        <div>
          {searchValue
            ? searchedMasters.map((el) => (
                <MasterCard
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  procedures={el.procedures}
                  slots={el.slots}
                  deleteMaster={onDeleteMaster}
                  editMaster={(id) => onEditMaster(id)}
                />
              ))
            : masters.map((el) => (
                <MasterCard
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  procedures={el.procedures}
                  slots={el.slots}
                  deleteMaster={onDeleteMaster}
                  editMaster={(id) => onEditMaster(id)}
                />
              ))}
        </div>
      </main>
      <Footer />

      <Modal
        active={newMasterModalActive}
        setActive={onClearMastersStates}
        onClearStates={onClearMastersStates}
      >
        <h1>Новый мастер</h1>
        <Input
          placeholder="Имя мастера"
          value={masterName}
          type="text"
          setValue={(e) => setMasterName(e.target.value)}
        />
        <p>Выполняемые процедуры:</p>
        <div className="choose-procedures__container">
          {procedures.map((procedure) => (
            <CheckboxRaw
              id={procedure.id}
              key={procedure.id}
              isSelected={
                !!selectedProcedures.find((el) => el.id === procedure.id)
              }
              title={procedure.name}
              onChange={handleOnChangeProcedureCheckbox}
            />
          ))}
        </div>
        <p>Рабочее время:</p>
        <div className="choose-slots__container">
          {slots.map((slot) => (
            <CheckboxRaw
              id={slot.id}
              key={slot.id}
              isSelected={!!selectedTimeSlots.find((el) => el.id === slot.id)}
              title={moment(slot.date).format('LLLL')}
              onChange={handleOnChangeTimeSlotCheckbox}
            />
          ))}
        </div>
        <div className="btns-container">
          <Button
            style="mainBtn"
            text="Сохранить"
            onPress={onCreateNewMaster}
          />
          <Button
            style="mainBtn"
            text="Выйти"
            onPress={onMasterCancelHandler}
          />
        </div>
      </Modal>

      <Modal
        active={editMasterModalActive}
        setActive={onClearMastersStates}
        onClearStates={onClearMastersStates}
      >
        <h1>Новый мастер</h1>
        <Input
          placeholder="Имя мастера"
          value={masterName}
          type="text"
          setValue={(e) => setMasterName(e.target.value)}
        />
        <p >Выполняемые процедуры:</p>
        <div className="choose-procedures__container">
          {procedures.map((procedure) => (
            <CheckboxRaw
              id={procedure.id}
              key={procedure.id}
              isSelected={
                !!selectedProcedures.find((el) => el.id === procedure.id)
              }
              title={procedure.name}
              onChange={handleOnChangeProcedureCheckbox}
            />
          ))}
        </div>
        <p>Рабочее время:</p>
        <div className="choose-slots__container">
          {slots.map((slot) => (
            <CheckboxRaw
              id={slot.id}
              key={slot.id}
              isSelected={!!selectedTimeSlots.find((el) => el.id === slot.id)}
              title={moment(slot.date).format('LLLL')}
              onChange={handleOnChangeTimeSlotCheckbox}
            />
          ))}
        </div>
        <div className="btns-container">
          <Button
            style="mainBtn"
            text="Сохранить"
            onPress={onSaveEditingMaster}
          />
          <Button
            style="mainBtn"
            text="Выйти"
            onPress={onMasterCancelHandler}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MastersPage;
