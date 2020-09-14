import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserList = ({ values, status}) => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      status && setUsers(users => [...users, status]);
    }, [status]);
  
    return (
      <div className="form">
        <Form>
          <Field type="text" name="name"/>
          <Field type="text" name="email"/>
          <Field type="text" name="password"/>
          <label className="checkbox">
            T.O.S.:
            <Field
              type="checkbox"
              name="serviceterms"
              checked={values.serviceterms}
            />
            <span className="checkmark" />
          </label>
          <button>Submit</button>
        </Form>
        {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Read Terms of Service: {user.serviceterms}</li>
          </ul>
        ))}
      </div>
    );
  };
  
  const NewForm = withFormik({
    mapPropsToValues({ name, email, password, serviceterms}) {
      return {
        name: "",
        email: "",
        password: "",
        serviceterms: false
        
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("No name given"),
      email: Yup.string().required("Please enter your email"),
    }),
    handleSubmit(values, { setStatus }) {
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(e => console.log(e.response));
    }
  })(UserList);
  export default NewForm;