import React, { useState } from 'react';
import './App.css';

export const App = () => {

  const [users, setUsers] = useState<string[]>([]);

  const handlePost = async () => {
    try {
        const response = await fetch("http://localhost:8080/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "田村三郎"})
        });
        if (!response.ok) {
          throw new Error('ネットワークレスポンスが正常ではありません');
        }
        handleGet();
      } catch(error) {
        console.error('フェッチ操作に問題が発生しました:', error);
      }
  };

  const handleGet = async () => {
    try {
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) {
          throw new Error('ネットワークレスポンスが正常ではありません');
        }
        const data = await response.json();
        setUsers(data);
      } catch(error) {
        console.error('フェッチ操作に問題が発生しました:', error);
      }
  };

  return (
    <div className='app'>
      <button className='button' onClick={handlePost}>
        田村三郎を追加
      </button>
      <br/>
      <button className='button' onClick={handleGet}>
        ユーザー一覧を取得
      </button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};
