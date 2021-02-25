import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRefresh } from '../redux/actions';

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRefresh(false));
  }, [dispatch]);
  return (
    <div className="container container--cart">
      <div>Adminka</div>
    </div>
  );
};

export { Admin };
