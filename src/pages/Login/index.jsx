import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const [errAuth, setErrAuth] = React.useState(false)
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if(!data.payload){
      setErrAuth(true)
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }

  }
  if(isAuth){
    return <Navigate to="/"/>;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід до акаунту
      </Typography>
      <Typography classes={{root: styles.subtitle}}>Увійдіть в свій акаунт або <Link to='/register'>зареєструйтесь</Link>, якщо Ви не зареєстровані</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Введіть вашу пошту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Введіть ваш пароль' })}
          fullWidth />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Увійти
        </Button>
        <Typography classes={{root: styles.error}}>{errAuth ? 'Неправильний логін або пароль' : <></>}</Typography>
      </form>

    </Paper>
  );
};
