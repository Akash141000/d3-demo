import styles from "./SignUpForm.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

type props = {
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpForm: React.FC<props> = (props) => {
  const initialFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNo: "",
    termsAndCondition: false,
  };
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required!"),
    password: yup
      .string()
      .min(8, "Password should be minimum 8 characters!")
      .max(15, "Password can be maximum 15 characters!")
      .required("Password is required!"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Password and Confirm Password should match!"
      )
      .required("Please confirm your password!"),
    fullName: yup
      .string()
      .min(5, "Please enter minimum 5 character")
      .required("Full name is required!"),
    phoneNo: yup
      .number()
      .min(10, "Phone number should be minimum 10 numbers!")
      .required("Phone number is required!"),
    termsAndCondition: yup
      .boolean()
      .isTrue("Please accept terms and conditions"),
  });
  return (
    <>
      <Formik
        initialValues={initialFormValues}
        validationSchema={schema}
        onSubmit={(_, { setSubmitting }) => {
          props.setFormSubmitted(true);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.form_header}>Create an account</div>
            <div className={styles[`field_container-column`]}>
              <label className={styles[`field_label-opaque`]}>
                Your email address
              </label>
              <Field className={styles.field_input} type="email" name="email" />
              <ErrorMessage
                className={styles.field_error}
                name="email"
                component="div"
              />
            </div>
            <div className={styles[`field_container-column`]}>
              <label className={styles[`field_label-opaque`]}>
                Your password
              </label>
              <Field
                className={styles.field_input}
                type="password"
                name="password"
              />
              <ErrorMessage
                className={styles.field_error}
                name="password"
                component="div"
              />
            </div>
            <div className={styles[`field_container-column`]}>
              <label className={styles[`field_label-opaque`]}>
                Confirm your password
              </label>
              <Field
                className={styles.field_input}
                type="password"
                name="confirmPassword"
              />
              <ErrorMessage
                className={styles.field_error}
                name="confirmPassword"
                component="div"
              />
            </div>
            <div className={styles[`field_container-column`]}>
              <label className={styles[`field_label-opaque`]}>
                Your full name
              </label>
              <Field
                className={styles.field_input}
                type="text"
                name="fullName"
              />
              <ErrorMessage
                className={styles.field_error}
                name="fullName"
                component="div"
              />
            </div>
            <div className={styles[`field_container-column`]}>
              <label className={styles[`field_label-opaque`]}>
                Your phone number
              </label>
              <Field
                className={styles[`field_input-phoneNo`]}
                type="number"
                name="phoneNo"
              />
              <ErrorMessage
                className={styles.field_error}
                name="phoneNo"
                component="div"
              />
            </div>

            <div className={styles[`field_container`]}>
              <div>
                <Field
                  className={styles[`field_input-checkbox`]}
                  type="checkbox"
                  name="termsAndCondition"
                />
                <label className={styles[`field_label-dark`]}>
                  I read and agree terms and conditions
                </label>
              </div>

              <ErrorMessage
                className={styles.field_error}
                name="termsAndCondition"
                component="div"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={
                isSubmitting
                  ? styles[`form_btn-disable`]
                  : styles[`form_btn-enable`]
              }
            >
              Create account
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { SignUpForm };
