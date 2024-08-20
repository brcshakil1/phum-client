import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: "A-0001",
  //     password: "admin123",
  //   },
  // });

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const [login, { isLoading }] = useLoginMutation(undefined);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const token = res.data.accessToken;
      const user = verifyToken(token) as TUser;
      dispatch(setUser({ user, token }));
      toast.success("Login user", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Login error", { id: toastId, duration: 2000 });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput
            type="text"
            name="userId"
            placeholder="Enter user id"
            label="ID:"
          />
          <PHInput
            type="text"
            name="password"
            placeholder="Enter your password"
            label="Password"
          />
          <Button htmlType="submit">Login</Button>
        </PHForm>
      </Row>
    </>
  );
};

export default Login;
