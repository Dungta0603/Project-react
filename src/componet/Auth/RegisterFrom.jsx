import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";
const initialValues = {
  fullName: "",
  email: "",
  Password: "",
  role: "ROLE_CUSTOMER",
};
export default function RegisterFrom() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSubmit = values => {
    console.log("form values", values);
    dispatch(registerUser({userData:values,navigate}))
  };
  return (
    <div>
      <Typography variant="h5" className="text-center">
        Đăng ký hệ thống
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Họ tên"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="password"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-simple-select-label">Role</InputLabel>
            <Field
              as={Select}
              labelId="role-simple-select-label"
              id="role-simple-select"
              // value={age}
              label="Role"
              name="role"
              // onChange={handleChange}
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Khách hàng</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>
                Chủ nhà hàng
              </MenuItem>
            </Field>
          </FormControl>
          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Đăng ký
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn đã có tài khoản?
        <Button onClick={() => navigate("/account/register")}>Đăng ký</Button>
      </Typography>
    </div>
  );
}