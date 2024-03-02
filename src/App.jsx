import axios from 'axios';
import UserItem from './Components/UserItem/UserItem';
import Input from './Components/Input/Input';
import Select from './Components/Select/Select';
import React, { useMemo, useState, useEffect } from 'react';

import styles from './App.module.css';




function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const sortedUsers = useMemo(() => {
    if (selectedSort) {
      return [...users].sort((a, b) => {
        if (selectedSort === "company.name") {
          return a.company.name.localeCompare(b.company.name);
        } else if (selectedSort) {
          return a[selectedSort]?.localeCompare(b[selectedSort] || "");
        } else {
          return users;
        }
      });
    } else {
      return users;
    }
  }, [selectedSort, users]);

  const sortedAndSearchedUsers = useMemo(() => {
    return sortedUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedUsers]);

  
  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        alert(`Ошибка: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        alert('Ошибка: Нет ответа от сервера');
      } else {
        alert(`Ошибка: ${error.message}`);
      }
    }
    setIsLoading(false)
  };


  const sortUsers = (sort) => {
    setSelectedSort(sort);
    console.log(sort);
  };


  useEffect(() => {
    fetchUsers();
  }, []); 

  useEffect(() => {
    fetchUsers();
  }, [selectedSort]);


  return (
    <div className={styles["App"]}>
      <h1 className={styles["main-title"]}>Список пользователей</h1>
      <div className={styles["cards-wrapp"]}>
        <div className={styles["search-wrapp"]}>
          <button onClick={() => fetchUsers()}>Обновить список</button>
          <Input
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <Select
            value={selectedSort}
            onChange={sortUsers}
            defaultValue={"Сортировка"}
            options={[
              { title: "По имени", key: "name" },
              { title: "По компании", key: "company.name" },
            ]}
          />
        </div>
        <div className={styles['user-info']}>
          <p className={styles['text']}>Имя пользователя</p>
          <p className={styles['text']}>Компания</p>
          <p className={styles['text']}>Email</p>
          <p className={styles['text']}>Номер телефона</p>
        </div>
        {isLoading ? (
            <h2>Идет загрузка...</h2>
          ) : sortedAndSearchedUsers.length !== 0 ? (
            sortedAndSearchedUsers.map((user) => (
              <UserItem
                user={user}
                key={user.id}
                name={user.name}
                company={user.company.name}
                email={user.email}
                phone={user.phone}
              />
            ))
          ) : (
            <div>Пользователь не найден</div>
          )}
      </div>
    </div>
  );
}

export default App;

